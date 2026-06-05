import { useEffect, useRef, useState } from 'react';
import { Pencil, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import logoImage from '@src/assets/logo.png';
import { getPosts, POST_CATEGORY_LABEL, PostCategory, PostResponse } from '@/api/community';
import { ApiError } from '@/api/client';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { TopBar } from '@/components/TopBar';

type CategoryFilter = '전체' | '질병 정보' | '약물 치료' | '일상생활' | '미분류';
type SpecificCategory = Exclude<CategoryFilter, '전체'>;

const CATEGORIES: CategoryFilter[] = ['전체', '질병 정보', '약물 치료', '일상생활', '미분류'];

const CATEGORY_TO_API: Record<SpecificCategory, PostCategory> = {
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
  // 다중 선택. '전체'가 있으면 전체 표시. 개별 선택 시 '전체' 자동 해제.
  const [selectedCategories, setSelectedCategories] = useState<Set<CategoryFilter>>(new Set(['전체']));
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PostResponse[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSearchActive = searchQuery.length > 0;

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch((err) => {
        console.error('[CommunityFeedPage] getPosts 실패:', err);
        setError(err instanceof ApiError && err.backendMessage ? err.backendMessage : '게시글을 불러오지 못했습니다.');
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!searchQuery.trim()) { setSearchResults(null); return; }

    debounceRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        // 카테고리가 하나만 선택된 경우에만 category 파라미터 전달
        const specificSelected = Array.from(selectedCategories).filter((c): c is SpecificCategory => c !== '전체');
        const category = specificSelected.length === 1 ? CATEGORY_TO_API[specificSelected[0]] : undefined;
        const results = await getPosts({ q: searchQuery, category });
        setSearchResults(results);
      } catch (err) {
        console.error('Failed to search posts:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery, selectedCategories]);

  const toggleCategory = (category: CategoryFilter) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (category === '전체') {
        return new Set(['전체']);
      }
      next.delete('전체');
      if (next.has(category)) {
        next.delete(category);
        if (next.size === 0) next.add('전체'); // 전부 해제되면 전체로 복귀
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
    searchInputRef.current?.focus();
  };

  const selectedApiCategories = new Set(
    Array.from(selectedCategories)
      .filter((c): c is SpecificCategory => c !== '전체')
      .map((c) => CATEGORY_TO_API[c]),
  );

  const visiblePosts = isSearchActive
    ? (searchResults ?? [])
    : selectedCategories.has('전체')
      ? posts
      : posts.filter((post) => selectedApiCategories.has(post.postCategory));

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="경험 공유" />

        {/* 검색 바 */}
        <div className="px-4 pb-2.5">
          <div className={`flex items-center gap-2 rounded-xl px-3 py-2 border transition-colors ${
            isSearchFocused ? 'bg-white border-purple-300' : 'bg-gray-200/70 border-transparent'
          }`}>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="게시글 검색"
              className="grow bg-transparent outline-none text-base text-gray-800 placeholder:text-gray-500"
            />
            {isSearchActive ? (
              <button type="button" onClick={clearSearch} className="shrink-0 text-gray-500 active:text-gray-700">
                <X className="w-3.5 h-3.5" strokeWidth={2.3} />
              </button>
            ) : (
              <Search className="w-3.5 h-3.5 text-gray-500 shrink-0" strokeWidth={2.3} />
            )}
          </div>
        </div>

        {/* 카테고리 칩 (다중 선택 Tag Chips 패턴) */}
        <div className="flex flex-wrap gap-1.5 px-4 pb-3">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategories.has(category);
            return (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                className={`font-bold whitespace-nowrap text-[13px] px-3 py-1.5 rounded-full border transition-colors ${
                  isSelected
                    ? 'bg-purple-100 border-[rgb(185,166,255)] text-purple-800'
                    : 'bg-transparent border-transparent text-gray-700'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* 목록 */}
        {isLoading || isSearching ? (
          <div className="flex flex-1 items-center justify-center text-gray-400 text-xs">
            {isSearching ? '검색 중...' : '불러오는 중...'}
          </div>
        ) : error ? (
          <div className="flex flex-1 items-center justify-center px-6 text-center text-red-400 text-xs">{error}</div>
        ) : visiblePosts.length === 0 ? (
          <ScrollArea className="items-center flex flex-col text-center gap-[14px] pt-8 px-6">
            <div className="flex items-center justify-center text-center w-24 h-24 shrink-0 overflow-visible">
              <img src={logoImage} alt="attune" className="block w-full h-full object-contain" />
            </div>
            <div className="font-bold text-center text-xl text-gray-900">
              {isSearchActive ? `"${searchQuery}" 검색 결과가 없어요` : '아직 비슷한 이야기가 없어요'}
            </div>
            <div className="text-center text-sm text-gray-500 leading-relaxed max-w-[15rem]">
              {isSearchActive
                ? '다른 검색어를 입력해 보세요.'
                : <>첫 글을 남기면<br />같은 경험을 가진 분들께<br />도움이 될 수 있어요.</> }
            </div>
            {!isSearchActive && (
              <button
                type="button"
                onClick={() => navigate('/community/write')}
                className="items-center flex font-bold justify-center text-center h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 min-w-[200px] pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem] mt-3"
              >
                <Pencil className="w-[14px] h-[14px] mr-1.5" strokeWidth={2.5} />
                <span className="block text-center">새 주제로 글쓰기</span>
              </button>
            )}
          </ScrollArea>
        ) : (
          <ScrollArea className="flex flex-col gap-2.5 pt-1">
            {visiblePosts.map((post) => (
              <button
                key={post.postId}
                type="button"
                onClick={() => navigate(`/community/post/${post.postId}`)}
                className="text-left bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]"
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

        {visiblePosts.length > 0 && (
          <button type="button" onClick={() => navigate('/community/write')} className="items-center flex font-bold absolute h-12 right-4 bottom-[88px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.2)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] z-[25] rounded-3xl">
            <Pencil className="w-[14px] h-[14px]" strokeWidth={2.5} />
            <span className="block">글쓰기</span>
          </button>
        )}
        <TabBar active="커뮤니티" />
      </div>
    </div>
  );
}
