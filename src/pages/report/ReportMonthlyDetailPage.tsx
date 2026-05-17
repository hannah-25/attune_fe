import React from 'react';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

export default function ReportMonthlyDetailPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="2026년 4월"
          left={<HeaderIconButton src="/icons/ba3e0bc210beb20976686007d14c25ffe98c31e4.svg" />}
          right={<HeaderIconButton src="/icons/e1dfe1879d41815105c23cae3a7327f7b95876ae.svg" />}
        />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-3 pt-0 pr-4 pb-6 pl-4">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-4 rounded-[1.625rem]">
            <div className="font-bold text-gray-600">
              한 줄 요약
            </div>
            <div className="font-extrabold mt-1 text-lg leading-[25.2px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
              아침형 루틴이 자리잡은 한 달이었 어요
            </div>
            <div className="flex mt-3 gap-1.5">
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                <span className="block">복용 92%</span>
              </div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                <span className="block">기록 24일</span>
              </div>
              <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-700 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
                <span className="block">감정 +0.8</span>
              </div>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="font-bold mb-[10px]">
              월간 캘린더
            </div>
            <div className="grid-cols-7 grid gap-1">
              <div className="aspect-square rounded-md" style={{"gridArea":"1 / 1 / 2 / 2"}}></div>
              <div className="aspect-square rounded-md" style={{"gridArea":"1 / 2 / 2 / 3"}}></div>
              <div className="aspect-square rounded-md" style={{"gridArea":"1 / 3 / 2 / 4"}}></div>
              <div className="aspect-square rounded-md" style={{"gridArea":"1 / 4 / 2 / 5"}}></div>
              <div className="aspect-square rounded-md" style={{"gridArea":"1 / 5 / 2 / 6"}}></div>
              <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"1 / 6 / 2 / 7"}}></div>
              <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"1 / 7 / 2 / 8"}}></div>
              <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"2 / 1 / 3 / 2"}}></div>
              <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"2 / 2 / 3 / 3"}}></div>
              <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"2 / 3 / 3 / 4"}}></div>
              <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"2 / 4 / 3 / 5"}}></div>
              <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"2 / 5 / 3 / 6"}}></div>
              <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"2 / 6 / 3 / 7"}}></div>
              <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"2 / 7 / 3 / 8"}}></div>
              <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"3 / 1 / 4 / 2"}}></div>
              <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"3 / 2 / 4 / 3"}}></div>
              <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"3 / 3 / 4 / 4"}}></div>
              <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"3 / 4 / 4 / 5"}}></div>
              <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"3 / 5 / 4 / 6"}}></div>
              <div className="aspect-square bg-purple-500 border-gray-900 border rounded-md" style={{"gridArea":"3 / 6 / 4 / 7"}}></div>
              <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"3 / 7 / 4 / 8"}}></div>
              <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"4 / 1 / 5 / 2"}}></div>
              <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"4 / 2 / 5 / 3"}}></div>
              <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"4 / 3 / 5 / 4"}}></div>
              <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"4 / 4 / 5 / 5"}}></div>
              <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"4 / 5 / 5 / 6"}}></div>
              <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"4 / 6 / 5 / 7"}}></div>
              <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"4 / 7 / 5 / 8"}}></div>
              <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"5 / 1 / 6 / 2"}}></div>
              <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"5 / 2 / 6 / 3"}}></div>
              <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"5 / 3 / 6 / 4"}}></div>
              <div className="aspect-square bg-purple-500 rounded-md" style={{"gridArea":"5 / 4 / 6 / 5"}}></div>
              <div className="aspect-square bg-purple-100 rounded-md" style={{"gridArea":"5 / 5 / 6 / 6"}}></div>
              <div className="aspect-square bg-purple-200 rounded-md" style={{"gridArea":"5 / 6 / 6 / 7"}}></div>
              <div className="aspect-square bg-purple-300 rounded-md" style={{"gridArea":"5 / 7 / 6 / 8"}}></div>
            </div>
            <div className="items-center flex mt-3 text-gray-600 text-xs gap-1.5">
              <span className="block">
                적음
              </span>
              <div className="w-3 h-2 bg-purple-100 rounded-xs"></div>
              <div className="w-3 h-2 bg-purple-200 rounded-xs"></div>
              <div className="w-3 h-2 bg-purple-300 rounded-xs"></div>
              <div className="w-3 h-2 bg-purple-500 rounded-xs"></div>
              <span className="block">
                많음
              </span>
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-2 gap-1.5">
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="/icons/554d6ce2320195f53a159850cecaca3c1ccfdbc1.svg" className="block size-full" />
              </div>
              <div className="font-bold">
                상관관계 인사이트
              </div>
            </div>
            <div className="text-gray-800 leading-[20.15px]">
              수면 6시간 미만인 날의 다음 날 업무 실수가 평 균
              <b className="font-bold">
                1.7배
              </b>
               더 많았어요.
            </div>
          </div>
          <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-[14px] rounded-[1.375rem]">
            <div className="items-center flex mb-2 gap-1.5">
              <div className="overflow-hidden w-[14px] h-[14px]">
                <img src="/icons/d3ec29d4f07f263a2a453b9617fffe0fcf9c97ed.svg" className="block size-full" />
              </div>
              <div className="font-bold">
                약물 반응
              </div>
            </div>
            <div className="text-gray-800 leading-[20.15px]">
              콘서타 복용 시작 후
              <b className="font-bold">
                3주차
              </b>
              부터 식욕 저하 빈도 가 줄었습니다.
            </div>
          </div>
          <div className="items-center flex font-bold justify-center w-full h-[50px] border-gray-900 border text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]">
            <div className="overflow-hidden w-[11px] h-[11px]">
              <img src="/icons/d61ce1645cdee1b65efeea1174a44f4db8d8be0e.svg" className="block size-full" />
            </div>
            <span className="block ml-[6px]">
              PDF로 내보내기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
