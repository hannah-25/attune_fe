import React, { useState } from 'react';
import { Pencil, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockPosts } from '@/mocks/community.mock';

type Category = '전체' | '질병 정보' | '약물 치료' | '일상생활' | '미분류';

const FILTERS: Category[] = ['전체', '질병 정보', '약물 치료', '일상생활', '미분류'];

const initialPosts = mockPosts;

export default function CommunityFeedPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<Category>('전체');
  const [posts, setPosts] = useState(initialPosts);

  const filteredPosts = activeFilter === '전체'
    ? posts
    : posts.filter((p) => p.category === activeFilter);

  const toggleLike = (id: number) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="경험 공유"
          left={<HeaderIconButton icon={<Search className="h-4 w-4 text-gray-700" strokeWidth={2.35} />} />}
          right={<HeaderIconButton icon={<Pencil className="h-4 w-4 text-gray-700" strokeWidth={2.35} />} onClick={() => navigate('/community/write')} />}
        />
        <div className="flex overflow-auto gap-1.5 pt-0 pr-4 pb-2 pl-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`font-bold whitespace-nowrap pt-1.5 pr-3 pb-1.5 pl-3 rounded-[0.875rem] transition-colors ${
                activeFilter === filter
                  ? 'bg-[rgb(31,_27,_46)] text-white'
                  : 'bg-white shadow-[rgba(0,0,0,0.05)_0px_1px_4px_0px] text-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <ScrollArea className="flex flex-col gap-2.5 pt-1">
          {filteredPosts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => navigate('/community/post')}
              className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem] text-left w-full"
            >
              <div className="items-center flex mb-[6px] gap-1.5">
                <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                  {post.category}
                </div>
                <div className="font-bold text-gray-500 text-xs">{post.author} · {post.time}</div>
              </div>
              <div className="font-bold leading-[18.2px]">{post.title}</div>
              <div className="mt-1 text-gray-600 leading-normal">{post.body}</div>
              <div className="flex font-bold mt-2 text-gray-500 text-xs gap-3">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); toggleLike(post.id); }}
                  className={`items-center flex gap-1 transition-colors ${post.liked ? 'text-purple-500' : 'text-gray-500'}`}
                >
                  <div className="overflow-hidden w-[10px] h-[10px]">
                    <img src={post.likeIconSrc} className="block size-full" />
                  </div>
                  {post.likes}
                </button>
                <span className="items-center flex gap-1">
                  <div className="overflow-hidden w-2 h-2">
                    <img src={post.commentIconSrc} className="block size-full" />
                  </div>
                  <span className="block">댓글</span>
                  {post.comments}
                </span>
              </div>
            </button>
          ))}
          {filteredPosts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-2">
              <div className="text-gray-400 font-semibold">게시글이 없어요</div>
              <div className="text-gray-300 text-xs">첫 번째 글을 작성해보세요</div>
            </div>
          )}
          <div className="flex justify-center py-4">
            <div className="w-5 h-5 border-2 border-purple-200 border-t-purple-500 rounded-full animate-spin" />
          </div>
        </ScrollArea>
        <button
          type="button"
          onClick={() => navigate('/community/write')}
          className="items-center flex font-bold absolute h-12 right-4 bottom-[88px] bg-[rgb(31,_27,_46)] shadow-[rgba(0,0,0,0.2)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] z-[25] rounded-3xl"
        >
          <div className="overflow-hidden w-[14px] h-[14px]">
            <img src="/icons/efb65dd04b728dd2a8742de28409d0e279ffaefe.svg" className="block size-full" />
          </div>
          <span className="block">글쓰기</span>
        </button>
        <TabBar active="커뮤니티" />
      </div>
    </div>
  );
}
