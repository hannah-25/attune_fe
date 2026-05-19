import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

const CATEGORIES = ['질병 정보', '약물 치료', '일상생활', '미분류'];

export default function CommunityWritePage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [anonymous, setAnonymous] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.style.height = 'auto';
      bodyRef.current.style.height = `${bodyRef.current.scrollHeight}px`;
    }
  }, [body]);

  const canPublish = title.trim().length > 0;

  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="새 글"
          left={<HeaderIconButton icon={<ChevronLeft className="h-4 w-4 text-gray-700" strokeWidth={2.5} />} />}
          reserveRight
        />

        <div className="overflow-y-auto overscroll-contain px-4 pt-1 pb-6 flex flex-col gap-3">

          {/* 카테고리 */}
          <div>
            <div className="text-xs font-bold text-purple-600 mb-2">카테고리 선택</div>
            <div className="flex overflow-x-auto gap-1.5 -mx-4 px-4 pb-0.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat === category ? null : cat)}
                  className={`font-bold whitespace-nowrap pt-1.5 pr-3 pb-1.5 pl-3 rounded-[0.875rem] transition-colors ${
                    category === cat
                      ? 'bg-purple-100 border border-[rgb(185,166,255)] text-purple-800'
                      : 'bg-white shadow-[rgba(0,0,0,0.05)_0px_1px_4px_0px] text-gray-500'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 제목 */}
          <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] rounded-2xl">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
              className="w-full font-bold text-base bg-transparent outline-none placeholder:text-gray-400 px-4 py-4"
              style={{ fontFamily: 'NanumSquare, system-ui' }}
            />
          </div>

          {/* 본문 */}
          <div className="bg-white border border-gray-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] rounded-2xl">
            <textarea
              ref={bodyRef}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="내용을 자유롭게 입력하세요"
              rows={8}
              className="w-full text-base text-gray-800 leading-relaxed bg-transparent outline-none resize-none overflow-hidden placeholder:text-gray-400 px-4 py-4"
            />
          </div>

          {/* 익명 + 발행 */}
          <div className="flex flex-col gap-2.5 pt-1">
            <label className="flex items-center gap-1.5 font-semibold text-sm text-purple-700 cursor-pointer">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-[18px] h-[18px] shrink-0 accent-purple-600"
              />
              <span>익명 작성</span>
            </label>
            <button
              type="button"
              disabled={!canPublish}
              className="w-full h-12 rounded-xl font-bold text-white bg-[rgb(31,27,46)] disabled:opacity-30 transition-all active:scale-[0.97]"
            >
              발행
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
