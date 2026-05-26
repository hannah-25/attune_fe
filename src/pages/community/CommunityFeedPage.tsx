import React, { useEffect, useState } from 'react';
import { Pencil, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import logoImage from '@src/assets/logo.png';
import { getPosts, POST_CATEGORY_LABEL, PostCategory, PostResponse } from '@/api/community';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

type CategoryFilter = '전체' | '질병 정보' | '약물 치료' | '일상생활' | '미분류';

const CATEGORIES: CategoryFilter[] = ['전체', '질병 정보', '약물 치료', '일상생활', '미분류'];

const CATEGORY_TO_API: Record<Exclude<CategoryFilter, '전체'>, PostCategory> = {
  '질병 정보': 'DISORDER_INFO',
  '약물 치료': 'MEDICATION',
  '일상생활': 'DAILY_LIFE',
  '미분류': 'DEFAULT',
};

function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return '방금';
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  return new Date(isoString).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
}

export default function CommunityFeedPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('전체');
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => {
        console.error('[CommunityFeedPage] getPosts 실패:', err);
        setError(String(err));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePosts = selectedCategory === '전체'
    ? posts
    : posts.filter((post) => post.postCategory === CATEGORY_TO_API[selectedCategory]);

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="경험 공유"
          left={<HeaderIconButton icon={<Search className="h-4 w-4 text-gray-700" strokeWidth={2.35} />} />}
          right={<HeaderIconButton icon={<Pencil className="h-4 w-4 text-gray-700" strokeWidth={2.35} />} onClick={() => navigate('/community/write')} />}
        />
        <div className="flex overflow-auto gap-1.5 pt-0 pr-4 pb-2 pl-4">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`font-bold whitespace-nowrap pt-1.5 pr-3 pb-1.5 pl-3 rounded-[0.875rem] transition-colors ${selectedCategory === category ? 'bg-[rgb(31,27,46)] text-white' : 'bg-white shadow-[rgba(0,0,0,0.05)_0px_1px_4px_0px] text-gray-700'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-1 items-center justify-center text-gray-400 text-xs">불러오는 중...</div>
        ) : error ? (
          <div className="flex flex-1 items-center justify-center px-6 text-center text-red-400 text-xs">{error}</div>
        ) : visiblePosts.length === 0 ? (
          <ScrollArea className="items-center flex flex-col text-center gap-[14px] pt-8 px-6">
            <div className="flex items-center justify-center text-center w-24 h-24 shrink-0 overflow-visible">
              <img src={logoImage} alt="attune" className="block w-full h-full object-contain" />
            </div>
            <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
              아직 비슷한 이야기가 없어요
            </div>
            <div className="text-center text-gray-600 leading-[20.15px] max-w-60">
              첫 글을 남기면 같은 경험을 가진 분들에게 도움이 될 수 있어요.
            </div>
            <div className="flex flex-wrap justify-center text-center mt-1 gap-1.5">
              <Chip>관련 콘텐츠 없음</Chip>
              <Chip>관련 검색 없음</Chip>
            </div>
            <button
              type="button"
              onClick={() => navigate('/community/write')}
              className="items-center flex font-bold justify-center text-center h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[200px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]"
            >
              <Pencil className="w-[14px] h-[14px] mr-1.5" strokeWidth={2.5} />
              <span className="block text-center">새 주제로 글쓰기</span>
            </button>
          </ScrollArea>
        ) : (
          <ScrollArea className="flex flex-col gap-2.5 pt-1">
            {visiblePosts.map((post) => (
              <button
                key={post.postId}
                type="button"
                onClick={() => navigate(`/community/post/${post.postId}`)}
                className="text-left bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]"
              >
                <div className="items-center flex mb-[6px] gap-1.5">
                  <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                    {POST_CATEGORY_LABEL[post.postCategory]}
                  </div>
                  <div className="font-bold text-gray-500 text-xs">{post.anonNickname} · {formatRelativeTime(post.createdAt)}</div>
                </div>
                <div className="font-bold leading-[18.2px]">{post.title}</div>
                <div className="mt-1 text-gray-600 leading-normal line-clamp-2">{post.content}</div>
              </button>
            ))}
          </ScrollArea>
        )}

        <button type="button" onClick={() => navigate('/community/write')} className="items-center flex font-bold absolute h-12 right-4 bottom-[88px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.2)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] z-[25] rounded-3xl">
          <Pencil className="w-[14px] h-[14px]" strokeWidth={2.5} />
          <span className="block">글쓰기</span>
        </button>
        <TabBar active="커뮤니티" />
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
      {children}
    </div>
  );
}
