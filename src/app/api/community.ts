import { apiRequest } from './client';

export type PostCategory = 'DEFAULT' | 'DISORDER_INFO' | 'MEDICATION' | 'DAILY_LIFE';

export const POST_CATEGORY_LABEL: Record<PostCategory, string> = {
  DEFAULT: '미분류',
  DISORDER_INFO: '질병 정보',
  MEDICATION: '약물 치료',
  DAILY_LIFE: '일상생활',
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

export function getPosts() {
  return apiRequest<PostResponse[]>('/v1/community/posts', { method: 'GET' });
}

export function getPost(postId: number) {
  return apiRequest<PostResponse>(`/v1/community/posts/${postId}`, { method: 'GET' });
}

export function createPost(payload: CreatePostRequest) {
  return apiRequest<PostResponse>('/v1/community/posts', {
    method: 'POST',
    body: payload,
  });
}

export function updatePost(postId: number, payload: Omit<CreatePostRequest, 'isAnonymous'>) {
  return apiRequest<PostResponse>(`/v1/community/posts/${postId}`, {
    method: 'PUT',
    body: payload,
  });
}

export function deletePost(postId: number) {
  return apiRequest<void>(`/v1/community/posts/${postId}`, { method: 'DELETE' });
}

export function getComments(postId: number) {
  return apiRequest<CommentResponse[]>(`/v1/community/posts/${postId}/comments`, { method: 'GET' });
}

export function createComment(postId: number, payload: CreateCommentRequest) {
  return apiRequest<{ commentId: number; anonNickname: string; isPostAuthor: boolean; createdAt: string }>(
    `/v1/community/posts/${postId}/comments`,
    { method: 'POST', body: payload },
  );
}

export function updateComment(commentId: number, payload: { content?: string; isAnonymous?: boolean }) {
  return apiRequest<{ commentId: number; updatedAt: string }>(
    `/v1/community/comments/${commentId}`,
    { method: 'PATCH', body: payload },
  );
}

export function deleteComment(commentId: number) {
  return apiRequest<void>(`/v1/community/comments/${commentId}`, { method: 'DELETE' });
}
