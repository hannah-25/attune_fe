import React from 'react';
import { useNavigate } from 'react-router';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

export default function EmptyMedicationPage() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="복용 중인 약"
          left={<HeaderIconButton src="/icons/f921e8c85af86e51ecbc0dd728facb51bb4127c0.svg" />}
          right={<HeaderIconButton src="/icons/c1b04de901d7982dcd4a65a2b9d530c8ba5d7dbd.svg" onClick={() => navigate('/medication/add')} />}
        />
        <ScrollArea className="flex flex-col gap-[14px] pt-3 px-5">
          <div className="bg-purple-100 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] p-4 rounded-3xl">
            <div className="items-center flex gap-3">
              <div className="items-center flex justify-center w-11 h-11 bg-white rounded-[1.375rem]">
                <span className="text-xl">💊</span>
              </div>
              <div className="grow basis-[0%]">
                <div className="font-extrabold text-lg leading-[22.5px]" style={{"fontFamily":"NanumSquare, system-ui"}}>
                  약을 등록해볼까요?
                </div>
                <div className="mt-1 text-purple-800 text-xs leading-[16.5px]">
                  복용 시간을 알려드리고, 효과·부작용 패턴을 분석해요
                </div>
              </div>
            </div>
          </div>
          <div className="font-bold text-gray-600 text-xs p-1">
            이렇게 도와드려요
          </div>
          <div className="items-center flex gap-3 p-1">
            <div className="items-center flex justify-center w-6 h-6 bg-purple-100 rounded-xl">
              <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
            </div>
            <div className="grow basis-[0%]">
              <div className="font-bold">시간 맞춰 알림</div>
              <div className="mt-[2px] text-gray-600 text-xs">잠금화면에서 바로 응답</div>
            </div>
          </div>
          <div className="items-center flex gap-3 p-1">
            <div className="items-center flex justify-center w-6 h-6 bg-purple-100 rounded-xl">
              <div className="w-2 h-2 bg-purple-500 rounded-sm"></div>
            </div>
            <div className="grow basis-[0%]">
              <div className="font-bold">복용 이력 자동 기록</div>
              <div className="mt-[2px] text-gray-600 text-xs">주간 리포트와 연결</div>
            </div>
          </div>
          <div className="items-center flex gap-3 p-1">
            <div className="items-center flex justify-center w-6 h-6 bg-purple-100 rounded-xl">
              <div className="w-2 h-2 bg-purple-300 rounded-sm"></div>
            </div>
            <div className="grow basis-[0%]">
              <div className="font-bold">약물 정보 조회</div>
              <div className="mt-[2px] text-gray-600 text-xs">식약처·임상 자료 기반</div>
            </div>
          </div>
        </ScrollArea>
        <div className="flex flex-col gap-2 px-5 pt-4 pb-[100px]">
          <button
            type="button"
            onClick={() => navigate('/medication/add')}
            className="items-center flex font-bold justify-center w-full h-[50px] bg-[rgb(31,27,46)] shadow-[rgba(0,0,0,0.04)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]"
          >
            <span className="block">+ 약 추가하기</span>
          </button>
          <div className="text-center text-gray-600 text-xs">
            <span className="text-center">약을 안 드시면 </span>
            <b className="font-bold text-center text-gray-900">
              <span className="text-center">건너뛰기</span>
            </b>
            <span className="text-center">도 가능해요</span>
          </div>
        </div>
        <TabBar active="약" />
      </div>
    </div>
  );
}
