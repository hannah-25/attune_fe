import { apiRequest } from './client';

export type PostCategory = 'DEFAULT' | 'DISORDER_INFO' | 'MEDICATION' | 'DAILY_LIFE';

export const POST_CATEGORY_LABEL: Record<PostCategory, string> = {
  DEFAULT: '기본',
  DISORDER_INFO: '질환 정보',
  MEDICATION: '약물 치료',
  DAILY_LIFE: '일상 생활',
};

export type PostResponse = {
  postId: number;
  title: string;
  content: string;
  postCategory: PostCategory;
  anonNickname: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
};

export type CommentResponse = {
  commentId: number;
  anonNickname: string;
  content: string;
  createdAt: string;
  isPostAuthor: boolean;
  isOwner: boolean;
};

export type CreatePostRequest = {
  postCategory: PostCategory;
  title: string;
  content: string;
  isAnonymous?: boolean;
};

export type CreateCommentRequest = {
  content: string;
  isAnonymous?: boolean;
};

export type GetPostsParams = {
  q?: string;
  category?: PostCategory;
};

export function getPosts(params?: GetPostsParams) {
  const query = new URLSearchParams();
  if (params?.q?.trim()) query.set('q', params.q.trim());
  if (params?.category) query.set('category', params.category);

  const qs = query.toString();
  const path = qs ? `/v1/community/posts?${qs}` : '/v1/community/posts';

  return apiRequest<unknown>(path, { method: 'GET' }).then(normalizePosts);
}

export function getPost(postId: number) {
  return apiRequest<unknown>(`/v1/community/posts/${postId}`, { method: 'GET' }).then(normalizeSinglePost);
}

export function createPost(payload: CreatePostRequest) {
  return apiRequest<unknown>('/v1/community/posts', {
    method: 'POST',
    body: payload,
  }).then(normalizeSinglePost);
}

export function updatePost(postId: number, payload: Omit<CreatePostRequest, 'isAnonymous'>) {
  return apiRequest<unknown>(`/v1/community/posts/${postId}`, {
    method: 'PUT',
    body: payload,
  }).then(normalizeSinglePost);
}

export function deletePost(postId: number) {
  return apiRequest<void>(`/v1/community/posts/${postId}`, { method: 'DELETE' });
}

export function getComments(postId: number) {
  return apiRequest<unknown>(`/v1/community/posts/${postId}/comments`, { method: 'GET' }).then(normalizeComments);
}

export function createComment(postId: number, payload: CreateCommentRequest) {
  return apiRequest<unknown>(
    `/v1/community/posts/${postId}/comments`,
    { method: 'POST', body: payload },
  ).then(normalizeCreatedComment);
}

export function updateComment(commentId: number, payload: { content?: string; isAnonymous?: boolean }) {
  return apiRequest<unknown>(
    `/v1/community/comments/${commentId}`,
    { method: 'PATCH', body: payload },
  ).then(normalizeUpdatedComment);
}

export function deleteComment(commentId: number) {
  return apiRequest<void>(`/v1/community/comments/${commentId}`, { method: 'DELETE' });
}

function normalizePosts(payload: unknown): PostResponse[] {
  const rawItems = extractArray(payload, ['posts', 'content', 'items', 'list']);
  return rawItems.map(normalizePost).filter((item): item is PostResponse => item !== null);
}

function normalizeSinglePost(payload: unknown): PostResponse {
  const raw = extractObject(payload, ['post', 'item', 'result']);
  const post = normalizePost(raw);

  if (!post) {
    throw new Error('게시글 응답 형식이 올바르지 않습니다.');
  }

  return post;
}

function normalizeComments(payload: unknown): CommentResponse[] {
  const rawItems = extractArray(payload, ['comments', 'content', 'items', 'list']);
  return rawItems.map(normalizeComment).filter((item): item is CommentResponse => item !== null);
}

function normalizeCreatedComment(payload: unknown): { commentId: number; anonNickname: string; isPostAuthor: boolean; createdAt: string } {
  const source = extractObject(payload, ['comment', 'result']);
  const record = asRecord(source);

  return {
    commentId: toNumber(record?.commentId, 0),
    anonNickname: toString(record?.anonNickname, '익명'),
    isPostAuthor: toBoolean(record?.isPostAuthor, false),
    createdAt: toString(record?.createdAt, ''),
  };
}

function normalizeUpdatedComment(payload: unknown): { commentId: number; updatedAt: string } {
  const source = extractObject(payload, ['comment', 'result']);
  const record = asRecord(source);

  return {
    commentId: toNumber(record?.commentId, 0),
    updatedAt: toString(record?.updatedAt, ''),
  };
}

function normalizePost(raw: unknown): PostResponse | null {
  const record = asRecord(raw);
  if (!record) return null;

  const postId = toNumber(record.postId, NaN);
  if (!Number.isFinite(postId)) return null;

  return {
    postId,
    title: toString(record.title, ''),
    content: toString(record.content, ''),
    postCategory: toPostCategory(record.postCategory),
    anonNickname: toString(record.anonNickname, '익명'),
    createdAt: toString(record.createdAt, ''),
    updatedAt: toString(record.updatedAt, ''),
    isOwner: toBoolean(record.isOwner, false),
  };
}

function normalizeComment(raw: unknown): CommentResponse | null {
  const record = asRecord(raw);
  if (!record) return null;

  const commentId = toNumber(record.commentId, NaN);
  if (!Number.isFinite(commentId)) return null;

  return {
    commentId,
    anonNickname: toString(record.anonNickname, '익명'),
    content: toString(record.content, ''),
    createdAt: toString(record.createdAt, ''),
    isPostAuthor: toBoolean(record.isPostAuthor, false),
    isOwner: toBoolean(record.isOwner, false),
  };
}

function toPostCategory(value: unknown): PostCategory {
  if (value === 'DISORDER_INFO' || value === 'MEDICATION' || value === 'DAILY_LIFE' || value === 'DEFAULT') {
    return value;
  }
  return 'DEFAULT';
}

function extractArray(payload: unknown, keys: string[]): unknown[] {
  if (Array.isArray(payload)) return payload;

  const record = asRecord(payload);
  if (!record) return [];

  for (const key of keys) {
    const candidate = record[key];
    if (Array.isArray(candidate)) return candidate;
  }

  if (record.data !== undefined) return extractArray(record.data, keys);
  if (record.result !== undefined) return extractArray(record.result, keys);

  return [];
}

function extractObject(payload: unknown, keys: string[]): unknown {
  const record = asRecord(payload);
  if (!record) return payload;

  for (const key of keys) {
    const candidate = record[key];
    if (candidate !== undefined) return candidate;
  }

  if (record.data !== undefined) return extractObject(record.data, keys);
  if (record.result !== undefined) return extractObject(record.result, keys);

  return payload;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function toString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function toNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function toBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}
