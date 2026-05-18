import React from 'react';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';
import { mockPostDetail, mockComments } from '@/mocks/community.mock';

const postContent = mockPostDetail.paragraphs;
const comments = mockComments;

export default function CommunityPostPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="글 상세"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          right={<HeaderIconButton icon={<MoreHorizontal className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
        />

        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-0 pt-0 pr-4 pb-20 pl-4">
          <div className="items-center flex mb-[10px] gap-1.5">
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block">{mockPostDetail.category}</span>
            </div>
            <div className="font-bold text-gray-500 text-xs">{mockPostDetail.author} · {mockPostDetail.time}</div>
          </div>

          <div className="font-extrabold mb-5 text-lg leading-[23.4px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
            {mockPostDetail.title}
          </div>

          <div className="flex flex-col gap-3 text-[15px] leading-[1.7] text-gray-700">
            {postContent.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="flex mt-4 gap-2">
            <div className="items-center flex grow justify-center bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-0 gap-1.5 p-2 rounded-[0.875rem]">
              <div className="overflow-hidden w-3 h-3">
                <img
                  src="/icons/d56f1bf80e3434cc00cc898c29df9c362f23fc35.svg"
                  className="block size-full"
                  alt=""
                />
              </div>
              <div className="font-bold">공감 {mockPostDetail.likes}</div>
            </div>
            <div className="items-center flex grow justify-center bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-0 gap-1.5 p-2 rounded-[0.875rem]">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img
                  src="/icons/df2703919175f9503d8dbe6dc130030c0dfd0974.svg"
                  className="block size-full"
                  alt=""
                />
              </div>
              <div className="font-bold">댓글 {mockPostDetail.commentCount}</div>
            </div>
          </div>

          <div className="h-px mt-4 mb-4 bg-purple-50" />
          <div className="font-bold mb-2 text-gray-600">댓글 {mockPostDetail.commentCount}</div>

          {comments.map((comment) => (
            <div className="flex mb-4 gap-2" key={`${comment.author}-${comment.body}`}>
              <div className={`w-7 h-7 ${comment.avatarClass} shrink-0 rounded-[0.875rem]`} />
              <div className="grow basis-0">
                <div className="items-center flex gap-1.5">
                  <div className="font-bold">{comment.author}</div>
                  {comment.isAuthor && (
                    <div className="items-center flex font-semibold whitespace-nowrap bg-purple-50 text-purple-600 text-[11px] gap-1 tracking-tight px-1.5 py-0.5 rounded-md">
                      <span className="block">작성자</span>
                    </div>
                  )}
                  <div className="text-gray-500 text-xs">· {comment.meta}</div>
                </div>
                <div className="mt-[3px] leading-normal">{comment.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="items-center flex absolute left-3 right-3 bottom-4 backdrop-blur-[20px] backdrop-saturate-[1.8] bg-white/85 border-white/70 border shadow-[rgba(60,40,90,0.12)_0px_10px_26px_0px] gap-1.5 p-[6px] rounded-3xl">
          <label className="items-center flex min-h-10 font-semibold whitespace-nowrap text-purple-800 text-sm gap-2 tracking-tight pt-2 pr-2.5 pb-2 pl-2.5 rounded-2xl">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 shrink-0 accent-purple-600"
            />
            <span className="block">익명</span>
          </label>
          <div className="grow basis-0 pt-1.5 pr-3 pb-1.5 pl-2">
            <div className="text-base text-gray-400">댓글을 입력해 주세요</div>
          </div>
          <div className="items-center flex justify-center w-9 h-9 bg-[rgb(31,_27,_46)] text-white rounded-[1.125rem]">
            <div className="overflow-hidden w-3 h-3">
              <img
                src="/icons/3caa747b918bbc5b5d58d1adcb49875f2ddc837b.svg"
                className="block size-full"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
