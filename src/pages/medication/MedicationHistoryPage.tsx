import React from 'react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '@/components/TopBar';

export default function MedicationHistoryPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50  text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar
          title="복용 이력"
          left={<HeaderIconButton src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F369584f11b1ffb755e198bea7e2638a7cd84109c.svg?generation=1778677416178768&alt=media" />}
          right={<HeaderIconButton src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fab8b2af29af823aa9e78ed534c6dece815a3c7eb.svg?generation=1778677416158829&alt=media" />}
        />
        <div className="flex gap-1.5 pt-0 pr-4 pb-3 pl-4">
          <div className="items-center flex grow font-bold justify-center h-[30px] bg-white basis-[0%] rounded-[0.9375rem]">1주</div>
          <div className="items-center flex grow font-bold justify-center h-[30px] bg-[rgb(31,_27,_46)] text-white basis-[0%] rounded-[0.9375rem]">1달</div>
          <div className="items-center flex grow font-bold justify-center h-[30px] bg-white basis-[0%] rounded-[0.9375rem]">3달</div>
          <div className="items-center flex grow font-bold justify-center h-[30px] bg-white basis-[0%] rounded-[0.9375rem]">직접</div>
        </div>
        <ScrollArea>
          <div className="mb-3 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-3 rounded-[1.125rem]">
            <div className="flex justify-around">
              <div className="text-center">
                <div className="font-extrabold text-center text-lg" style={{ fontFamily: "NanumSquare, system-ui" }}>86%</div>
                <div className="text-center mt-[2px] text-gray-600 text-xs">복용률</div>
              </div>
              <div className="text-center">
                <div className="font-extrabold text-center text-lg" style={{ fontFamily: "NanumSquare, system-ui" }}>52</div>
                <div className="text-center mt-[2px] text-gray-600 text-xs">복용</div>
              </div>
              <div className="text-center">
                <div className="font-extrabold text-center text-lg" style={{ fontFamily: "NanumSquare, system-ui" }}>8</div>
                <div className="text-center mt-[2px] text-gray-600 text-xs">미복용</div>
              </div>
              <div className="text-center">
                <div className="font-extrabold text-center text-lg" style={{ fontFamily: "NanumSquare, system-ui" }}>3</div>
                <div className="text-center mt-[2px] text-gray-600 text-xs">미루기</div>
              </div>
            </div>
          </div>
          <div className="mb-[14px]">
            <div className="font-bold mb-[6px] text-gray-600 pt-0 pr-1 pb-0 pl-1">5월 13일 화</div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
              <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
                <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                  <div className="overflow-hidden w-[10px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F553aadff6c732777ebf05fd7879f8ace0c08808a.svg?generation=1778677416186674&amp;alt=media" className="block size-full" />
                  </div>
                </div>
                <div className="grow basis-[0%]">08:00 콘서타 18mg</div>
                <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
              </div>
              <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
                <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                  <div className="overflow-hidden w-[10px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb8a302e36ea60d69f9992783ad06a14925a796f1.svg?generation=1778677416189119&amp;alt=media" className="block size-full" />
                  </div>
                </div>
                <div className="grow basis-[0%]">12:30 콘서타 18mg</div>
                <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
              </div>
              <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3">
                <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-50 rounded-[0.5625rem]"></div>
                <div className="grow basis-[0%]">19:00 스트라테라 40mg</div>
                <div className="font-bold uppercase text-gray-500 text-xs">예정</div>
              </div>
            </div>
          </div>
          <div className="mb-[14px]">
            <div className="font-bold mb-[6px] text-gray-600 pt-0 pr-1 pb-0 pl-1">5월 12일 월</div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
              <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
                <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                  <div className="overflow-hidden w-[10px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fc31c4c0925d22f49ca58fec0a3e791abffca3580.svg?generation=1778677416233923&amp;alt=media" className="block size-full" />
                  </div>
                </div>
                <div className="grow basis-[0%]">08:00 콘서타 18mg</div>
                <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
              </div>
              <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
                <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                  <div className="overflow-hidden w-[10px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F719f555dcc9b8aaf4c575aa9cbfc52e2ee272988.svg?generation=1778677416247566&amp;alt=media" className="block size-full" />
                  </div>
                </div>
                <div className="grow basis-[0%]">12:30 콘서타 18mg</div>
                <div className="font-bold uppercase text-gray-500 text-xs">건너뜀</div>
              </div>
              <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3">
                <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                  <div className="overflow-hidden w-[10px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F1196b0549314af128fc7d97294ec92ba1d96593d.svg?generation=1778677416247140&amp;alt=media" className="block size-full" />
                  </div>
                </div>
                <div className="grow basis-[0%]">19:00 스트라테라 40mg</div>
                <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
              </div>
            </div>
          </div>
          <div className="mb-[14px]">
            <div className="font-bold mb-[6px] text-gray-600 pt-0 pr-1 pb-0 pl-1">5월 11일 일</div>
            <div className="bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-[1.125rem]">
              <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
                <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                  <div className="overflow-hidden w-[10px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Ffa6bbf8b97533e585241d6a212c73d52139abc7e.svg?generation=1778677416258367&amp;alt=media" className="block size-full" />
                  </div>
                </div>
                <div className="grow basis-[0%]">08:00 콘서타 18mg</div>
                <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
              </div>
              <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3 border-b" style={{ borderBottomColor: "rgb(233, 228, 220)" }}>
                <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                  <div className="overflow-hidden w-[10px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F49bc90d075790a4096bd013fa7ecd0d5f355895a.svg?generation=1778677416303916&amp;alt=media" className="block size-full" />
                  </div>
                </div>
                <div className="grow basis-[0%]">12:30 콘서타 18mg</div>
                <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
              </div>
              <div className="items-center flex gap-2.5 pt-[11px] pr-3 pb-[11px] pl-3">
                <div className="items-center flex justify-center w-[18px] h-[18px] bg-purple-300 rounded-[0.5625rem]">
                  <div className="overflow-hidden w-[10px] h-[10px]">
                    <img src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fe64256a64d85adaec88e5c4afbf9732379418611.svg?generation=1778677416319297&amp;alt=media" className="block size-full" />
                  </div>
                </div>
                <div className="grow basis-[0%]">19:00 스트라테라 40mg</div>
                <div className="font-bold uppercase text-gray-500 text-xs">복용</div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <TabBar active="약" />
      </div>
    </div>
  );
}
