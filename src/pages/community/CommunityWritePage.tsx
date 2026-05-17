import React, { useState } from 'react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

export default function CommunityWritePage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="새 글"
          left={<HeaderIconButton src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F748bff70642e790d3da4f67ab0478b2847c249a0.svg?generation=1778677418486773&alt=media" />}
          right={
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="font-bold text-white bg-[rgb(31,27,46)] px-3 py-1 rounded-lg">발행</div>
              </div>
            </div>
          }
        />
        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] pt-0 pr-4 pb-2 pl-4">
          <div className="flex mb-3 gap-1.5">
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-transparent border text-purple-700 gap-1.5 tracking-tight pt-[9px] pr-[14px] pb-[9px] pl-[14px] rounded-[62.4375rem]">
              <span className="block">+ 카테고리</span>
            </div>
            <div className="grow basis-[0%]"></div>
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-[rgb(185,166,255)] border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block">익명</span>
            </div>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            className="w-full font-bold text-lg bg-transparent outline-none placeholder:text-gray-300 mb-3"
            style={{ fontFamily: "NanumSquare, system-ui" }}
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="내용을 입력해 주세요"
            rows={8}
            className="w-full text-base text-gray-900 leading-relaxed bg-transparent outline-none resize-none placeholder:text-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
