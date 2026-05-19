import React from 'react';
import { MessageCircle, Pencil, Search, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockPosts } from '@/mocks/community.mock';

const CATEGORIES = ['전체', '콘서타', '스트라테라', '아데랄', '일반'];

export default function CommunityFeedPage() {
  const navigate = useNavigate();

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
          {CATEGORIES.map((category, index) => (
            <div key={category} className={`font-bold whitespace-nowrap pt-1.5 pr-3 pb-1.5 pl-3 rounded-[0.875rem] ${index === 0 ? 'bg-[rgb(31,27,46)] text-white' : 'bg-white shadow-[rgba(0,0,0,0.05)_0px_1px_4px_0px]'}`}>{category}</div>
          ))}
        </div>
        <ScrollArea className="flex flex-col gap-2.5 pt-1">
          {mockPosts.map((post) => (
            <button key={post.id} type="button" onClick={() => navigate('/community/post')} className="text-left bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.125rem]">
              <div className="items-center flex mb-[6px] gap-1.5">
                <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">{post.category}</div>
                <div className="font-bold text-gray-500 text-xs">{post.author} · {post.time}</div>
              </div>
              <div className="font-bold leading-[18.2px]">{post.title}</div>
              <div className="mt-1 text-gray-600 leading-normal">{post.body}</div>
              <div className="flex font-bold mt-2 text-gray-500 text-xs gap-3">
                <span className="items-center flex gap-1"><ThumbsUp className="w-[11px] h-[11px]" strokeWidth={2.5} />{post.likes}</span>
                <span className="items-center flex gap-1"><MessageCircle className="w-[11px] h-[11px]" strokeWidth={2.5} />댓글 {post.comments}</span>
              </div>
            </button>
          ))}
        </ScrollArea>
        <button type="button" onClick={() => navigate('/community/write')} className="items-center flex font-bold absolute h-12 right-4 bottom-[88px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.2)_0px_8px_22px_0px] text-white text-sm gap-1.5 pt-0 pr-[18px] pb-0 pl-[18px] z-[25] rounded-3xl">
          <Pencil className="w-[14px] h-[14px]" strokeWidth={2.5} />
          <span className="block">글쓰기</span>
        </button>
        <TabBar active="커뮤니티" />
      </div>
    </div>
  );
}
