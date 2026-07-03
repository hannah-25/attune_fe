import React, { useEffect, useRef, useState } from 'react';
import { Bookmark, Eye, Flag, Heart, MessageCircle, MoreHorizontal, Pencil, Send, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { NavBackButton } from '@/components/NavButtons';
import { parseServerDateTime } from '@/lib/date';
import {
  getPost, getComments, createComment, deletePost,
  POST_CATEGORY_LABEL, PostResponse, CommentResponse,
} from '@/api/community';

function formatRelativeTime(isoString: string): string {
  const parsed = parseServerDateTime(isoString);
  if (Number.isNaN(parsed.getTime())) return isoString || '-';

  const diff = Date.now() - parsed.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return '방금';
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  return parsed.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
}

const AVATAR_COLORS = [
  'bg-purple-200', 'bg-[rgb(208,201,189)]', 'bg-blue-200',
  'bg-green-200', 'bg-yellow-200', 'bg-pink-200',
];
function avatarColor(nickname: string) {
  let hash = 0;
  for (let i = 0; i < nickname.length; i++) hash = nickname.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const REPORT_REASONS = ['스팸·광고', '욕설·혐오 표현', '개인정보 노출', '부적절한 내용', '기타'];

type ReportTarget = { type: 'post'; id: number } | { type: 'comment'; id: number };

export default function CommunityPostPage() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<PostResponse | null>(null);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentLikes, setCommentLikes] = useState<Record<number, boolean>>({});

  const toggleCommentLike = (commentId: number) =>
    setCommentLikes((prev) => ({ ...prev, [commentId]: !prev[commentId] }));

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [isReporting, setIsReporting] = useState(false);
  const [reportDone, setReportDone] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!postId) return;
    const id = Number(postId);
    getPost(id).then(setPost).catch((err) => { console.error('Failed to load post:', err); });
    getComments(id).then(setComments).catch((err) => { console.error('Failed to load comments:', err); });
  }, [postId]);

  const handleSubmit = async () => {
    if (!postId || !commentText.trim()) return;
    setIsSubmitting(true);
    try {
      await createComment(Number(postId), { content: commentText.trim(), isAnonymous });
      setCommentText('');
      const updated = await getComments(Number(postId));
      setComments(updated);
    } catch (err) {
      console.error('Failed to submit comment:', err);
      // 추후 토스트 연결
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!postId) return;
    setIsDeleting(true);
    try {
      await deletePost(Number(postId));
      navigate('/community', { replace: true });
    } catch (err) {
      console.error('Failed to delete post:', err);
      setIsDeleting(false);
      setMenuOpen(false);
      setConfirmDelete(false);
    }
  };

  const handleReport = async () => {
    if (!reportTarget || !reportReason) return;
    setIsReporting(true);
    try {
      // TODO: 신고 API 연동
      await new Promise<void>((r) => setTimeout(r, 600));
      setReportDone(true);
    } catch (err) {
      console.error('Failed to report:', err);
      // 추후 토스트 연결
    } finally {
      setIsReporting(false);
    }
  };

  const openReport = (type: 'post' | 'comment', id: number) => {
    if (type === 'post') setReportTarget({ type: 'post', id });
    else setReportTarget({ type: 'comment', id });
    setReportReason('');
    setReportDone(false);
  };

  const closeReport = () => {
    setReportTarget(null);
    setReportReason('');
    setReportDone(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setConfirmDelete(false);
  };

  if (!post) {
    return (
      <div
        className="w-full h-full bg-gray-50 text-sm flex flex-col items-center justify-center text-gray-400"
        style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        불러오는 중...
      </div>
    );
  }

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title=""
          left={<NavBackButton />}
          right={
            <HeaderIconButton
              icon={<MoreHorizontal className="h-4 w-4 text-gray-700" strokeWidth={2.5} />}
              onClick={() => {
                if (post.isOwner) setMenuOpen(true);
                else openReport('post', post.postId);
              }}
            />
          }
        />

        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pb-28 bg-gray-50">

          {/* 게시글 본문 */}
          <div className="px-4 pt-4 pb-4">
            {/* 작성자 헤더: 아바타 + 닉네임 · 시간 */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className={`w-7 h-7 shrink-0 rounded-full ${avatarColor(post.anonNickname)}`} />
              <span className="font-bold text-gray-800 text-xs truncate">{post.anonNickname}</span>
              <span className="text-gray-300 text-[11px] shrink-0">·</span>
              <span className="text-gray-400 text-[11px] shrink-0">{formatRelativeTime(post.createdAt)}</span>
            </div>

            {/* 카테고리 + 제목 */}
            <div className="flex items-baseline gap-2 mb-3.5">
              <span className="font-semibold text-purple-600 text-[11px] whitespace-nowrap shrink-0">
                {POST_CATEGORY_LABEL[post.postCategory]}
              </span>
              <div className="font-extrabold text-[17px] leading-snug" style={{ fontFamily: 'NanumSquare, system-ui' }}>
                {post.title}
              </div>
            </div>

            {/* 본문 */}
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mb-5">{post.content}</div>

            {/* 액션 버튼 행 */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setLiked((v) => !v); setLikeCount((n) => liked ? n - 1 : n + 1); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-colors select-none active:scale-95 ${
                  liked
                    ? 'bg-red-50 border-red-200 text-red-400'
                    : 'bg-gray-50 border-gray-200 text-gray-500'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-red-400' : ''}`} strokeWidth={2.5} />
                공감{likeCount > 0 ? ` ${likeCount}` : ''}
              </button>
              <button
                type="button"
                onClick={() => inputRef.current?.focus()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border bg-gray-50 border-gray-200 text-gray-500 text-xs font-bold active:scale-95 transition-colors select-none"
              >
                <MessageCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                댓글{comments.length > 0 ? ` ${comments.length}` : ''}
              </button>
              <div className="ml-auto flex items-center gap-2.5">
                <div className="flex items-center gap-0.5 text-gray-300 text-[11px]">
                  <Eye className="w-3 h-3" strokeWidth={2} />
                  <span>0</span>
                </div>
                <button
                  type="button"
                  onClick={() => setBookmarked((v) => !v)}
                  className={`flex items-center transition-colors select-none active:scale-95 ${bookmarked ? 'text-purple-500' : 'text-gray-300'}`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-purple-500' : ''}`} strokeWidth={2.5} />
                </button>
                {!post.isOwner && (
                  <button
                    type="button"
                    onClick={() => openReport('post', post.postId)}
                    className="flex items-center transition-colors select-none active:scale-95 text-gray-300 active:text-red-400"
                  >
                    <Flag className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="mt-2">
            <div className="px-4 py-3 border-b border-gray-100">
              <span className="font-bold text-gray-700 text-sm">댓글{comments.length > 0 ? ` ${comments.length}` : ''}</span>
            </div>
            {comments.map((comment, i) => (
              <div key={comment.commentId} className={`flex gap-2.5 px-4 py-3 ${i < comments.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className={`w-7 h-7 shrink-0 rounded-full mt-0.5 ${avatarColor(comment.anonNickname)}`} />
                <div className="grow basis-[0%] min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="font-bold text-gray-800 text-xs">{comment.anonNickname}</span>
                    {comment.isPostAuthor && (
                      <span className="font-semibold bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded-full">글쓴이</span>
                    )}
                    <span className="text-gray-400 text-[11px] ml-auto shrink-0">{formatRelativeTime(comment.createdAt)}</span>
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed mb-2">{comment.content}</div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleCommentLike(comment.commentId)}
                      className={`flex items-center gap-1 text-[11px] font-semibold transition-colors active:scale-95 ${commentLikes[comment.commentId] ? 'text-red-400' : 'text-gray-400'}`}
                    >
                      <Heart className={`w-3 h-3 ${commentLikes[comment.commentId] ? 'fill-red-400' : ''}`} strokeWidth={2.5} />
                      좋아요
                    </button>
                    <button type="button" className="flex items-center gap-1 text-[11px] font-semibold text-gray-400 active:text-purple-500 transition-colors">
                      <MessageCircle className="w-3 h-3" strokeWidth={2.5} />
                      대댓글
                    </button>
                    {!comment.isOwner && (
                      <button
                        type="button"
                        onClick={() => openReport('comment', comment.commentId)}
                        className="ml-auto text-[11px] font-semibold text-gray-300 active:text-red-400 transition-colors"
                      >
                        신고
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 댓글 입력 */}
        <div className="absolute left-3 right-3 bottom-4 flex flex-col gap-1.5">
          <label className="flex items-center gap-2 self-start cursor-pointer pl-1">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-[18px] h-[18px] accent-purple-600"
            />
            <span className="text-xs font-semibold text-gray-500">익명 작성</span>
          </label>
          <div className="flex items-center backdrop-blur-[20px] backdrop-saturate-[1.8] bg-white/85 border border-white/70 shadow-[rgba(60,40,90,0.12)_0px_10px_26px_0px] gap-1.5 p-[6px] rounded-3xl">
            <input
              ref={inputRef}
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
              placeholder="댓글을 입력하세요"
              className="min-w-0 grow pt-1.5 pr-2 pb-1.5 pl-3 bg-transparent outline-none text-base text-gray-800 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!commentText.trim() || isSubmitting}
              className="shrink-0 flex items-center justify-center w-9 h-9 bg-[rgb(31,27,46)] text-white rounded-[1.125rem] disabled:opacity-40 transition-opacity"
            >
              <Send className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* 게시글 관리 바텀시트 (작성자 전용: 편집·삭제) */}
      {menuOpen && (
        <>
          <div className="absolute inset-0 bg-black/30 z-30" onClick={closeMenu} />
          <div className="absolute left-0 right-0 bottom-0 z-40 bg-white rounded-t-2xl px-4 pt-5 pb-8 flex flex-col gap-2">
            {!confirmDelete ? (
              <>
                <div className="w-8 h-1 rounded-full bg-gray-200 mx-auto mb-3" />
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    navigate('/community/write', { state: { postId: post.postId, post } });
                  }}
                  className="flex items-center gap-3 w-full px-2 py-3 rounded-xl text-gray-800 font-semibold active:bg-gray-50 transition-colors"
                >
                  <Pencil className="w-4 h-4 text-gray-500" strokeWidth={2.2} />
                  편집
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="flex items-center gap-3 w-full px-2 py-3 rounded-xl text-red-500 font-semibold active:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={2.2} />
                  삭제
                </button>
              </>
            ) : (
              <>
                <div className="w-8 h-1 rounded-full bg-gray-200 mx-auto mb-3" />
                <div className="text-center font-bold text-gray-900 mb-1">게시글을 삭제할까요?</div>
                <div className="text-center text-gray-500 text-xs mb-3">삭제된 글은 복구할 수 없어요.</div>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full h-12 rounded-xl bg-red-500 text-white font-bold disabled:opacity-50 transition-all active:scale-[0.97]"
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="w-full h-11 rounded-xl text-gray-600 font-semibold active:bg-gray-50 transition-colors"
                >
                  취소
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* 신고 바텀시트 */}
      {reportTarget && (
        <>
          <div className="absolute inset-0 bg-black/30 z-30" onClick={closeReport} />
          <div className="absolute left-0 right-0 bottom-0 z-40 bg-white rounded-t-2xl px-4 pt-5 pb-8 flex flex-col gap-2">
            <div className="w-8 h-1 rounded-full bg-gray-200 mx-auto mb-3" />
            {!reportDone ? (
              <>
                <div className="font-bold text-gray-900 text-base mb-0.5">
                  {reportTarget.type === 'post' ? '게시글 신고' : '댓글 신고'}
                </div>
                <div className="text-gray-400 text-xs mb-3">신고 사유를 선택해 주세요.</div>
                <div className="flex flex-col gap-2 mb-2">
                  {REPORT_REASONS.map((reason) => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => setReportReason(reason)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                        reportReason === reason
                          ? 'bg-purple-50 text-purple-700 border border-[rgb(185,166,255)]'
                          : 'bg-gray-50 text-gray-700 border border-transparent'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!reportReason || isReporting}
                  onClick={handleReport}
                  className="w-full h-12 rounded-xl bg-red-500 text-white font-bold disabled:opacity-40 transition-all active:scale-[0.97]"
                >
                  {isReporting ? '신고 중...' : '신고하기'}
                </button>
                <button
                  type="button"
                  onClick={closeReport}
                  className="w-full h-11 rounded-xl text-gray-600 font-semibold active:bg-gray-50 transition-colors"
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center py-4 gap-2">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-1">
                    <Flag className="w-5 h-5 text-red-400" strokeWidth={2.2} />
                  </div>
                  <div className="font-bold text-gray-900 text-base">신고가 접수되었어요</div>
                  <div className="text-gray-400 text-xs text-center">검토 후 조치될 예정이에요.</div>
                </div>
                <button
                  type="button"
                  onClick={closeReport}
                  className="w-full h-12 rounded-xl bg-[rgb(31,27,46)] text-white font-bold transition-all active:scale-[0.97]"
                >
                  확인
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
