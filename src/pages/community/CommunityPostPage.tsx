import React from 'react';
import { ChevronLeft, MessageCircle, MoreHorizontal, Send, ThumbsUp } from 'lucide-react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockComments, mockPostDetail } from '@/mocks/community.mock';

export default function CommunityPostPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title=""
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          right={<HeaderIconButton icon={<MoreHorizontal className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
        />
        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-20 pl-4">
          <div className="items-center flex mb-[10px] gap-1.5">
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block">{mockPostDetail.category}</span>
            </div>
            <div className="font-bold text-gray-500 text-xs">{mockPostDetail.author} · {mockPostDetail.time}</div>
          </div>
          <div className="font-extrabold mb-3 text-lg leading-[23.4px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
            {mockPostDetail.title}
          </div>
          <div className="flex flex-col gap-[9px] text-gray-800 leading-relaxed">
            {mockPostDetail.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="flex mt-4 gap-2">
            <ActionButton icon={<ThumbsUp className="w-3 h-3" strokeWidth={2.5} />} label={`공감 ${mockPostDetail.likes}`} />
            <ActionButton icon={<MessageCircle className="w-3 h-3" strokeWidth={2.5} />} label={`댓글 ${mockPostDetail.commentCount}`} />
          </div>
          <div className="h-px mt-4 mb-4 bg-purple-50"></div>
          <div className="font-bold mb-2 text-gray-600">댓글 {mockPostDetail.commentCount}</div>
          {mockComments.map((comment) => (
            <div key={`${comment.author}-${comment.body}`} className="flex mb-[10px] gap-2">
              <div className={`w-7 h-7 ${comment.avatarClass} shrink-[0] rounded-[0.875rem]`}></div>
              <div className="grow basis-[0%]">
                <div className="items-center flex gap-1.5">
                  <div className="font-bold">{comment.author}</div>
                  {comment.isAuthor ? <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">글쓴이</div> : null}
                  <div className="text-gray-500 text-xs">· {comment.meta}</div>
                </div>
                <div className="mt-[3px] leading-normal">{comment.body}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="items-center flex absolute left-3 right-3 bottom-4 backdrop-blur-[20px] backdrop-saturate-[1.8] bg-white/85 border-white/70 border shadow-[rgba(60,40,90,0.12)_0px_10px_26px_0px] gap-1.5 p-[6px] rounded-3xl">
          <div className="grow basis-[0%] pt-1.5 pr-3 pb-1.5 pl-3 text-gray-400">댓글을 입력하세요</div>
          <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
            익명
          </div>
          <button type="button" className="items-center flex justify-center w-9 h-9 bg-[rgb(31,27,46)] text-white rounded-[1.125rem]">
            <Send className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button type="button" className="items-center flex grow justify-center bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-[0%] gap-1.5 p-2 rounded-[0.875rem]">
      {icon}
      <div className="font-bold">{label}</div>
    </button>
  );
}
