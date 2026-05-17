import React from 'react';

const postContent = [
  '콘서타를 시작한 지 일주일 정도 됐는데, 오전에는 확실히 머릿속이 조용해지는 느낌이 있어요. 할 일을 하나씩 붙잡고 끝까지 가져가는 시간이 조금 늘었습니다.',
  '다만 오후 3시쯤부터 속이 비고 예민해지는 느낌이 있고, 잠들기 전까지 긴장이 남아 있는 날도 있네요. 물을 자주 마시고 점심을 챙겨 먹으면 조금 덜한 것 같아요.',
  '비슷한 시기에 적응하신 분들은 언제쯤 몸이 편해졌나요? 병원에 가기 전까지 기록해두면 좋을 증상이나 생활 팁이 있으면 공유 부탁드려요.',
];

const comments = [
  {
    author: '루나',
    avatarClass: 'bg-[rgb(208,_201,_189)]',
    meta: '방금',
    body: '저도 비슷했어요. 식사랑 수면 기록을 같이 적어두면 진료 때 설명하기 좋더라고요.',
  },
  {
    author: '글쓴이',
    avatarClass: 'bg-purple-300',
    meta: '방금',
    body: '감사합니다. 오늘부터 시간대별로 메모해볼게요.',
    isAuthor: true,
  },
  {
    author: '익명',
    avatarClass: 'bg-[rgb(208,_201,_189)]',
    meta: '방금',
    body: '오후에 카페인을 줄이면 덜 예민해지는 경우도 있었어요. 무리하지 말고 천천히 보세요.',
  },
];

export default function CommunityPostPage() {
  return (
    <div
      className="w-full h-dvh bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex flex-col gap-1 pt-1 pr-3 pb-[10px] pl-3 shrink-0">
          <div className="items-center flex justify-between relative">
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img
                    src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd77b1743156ca690dcd7dbf0664fde91d06c07f9.svg?generation=1778677418382924&amp;alt=media"
                    className="block size-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 font-bold text-base">글 상세</div>
            <div className="items-center flex justify-center w-11 h-11">
              <div className="items-center flex justify-center w-9 h-9 bg-white/85 shadow-[rgba(60,40,90,0.06)_0px_1px_2px_0px,_rgba(255,255,255,0.6)_0px_1px_0px_0px_inset] rounded-[1.125rem]">
                <div className="overflow-hidden w-4 h-4">
                  <img
                    src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fb22a03c0a3fd06b85a7db92a93b2d633dc42599c.svg?generation=1778677418394861&amp;alt=media"
                    className="block size-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-0 pt-0 pr-4 pb-20 pl-4">
          <div className="items-center flex mb-[10px] gap-1.5">
            <div className="items-center flex font-semibold whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">
              <span className="block">약물 치료</span>
            </div>
            <div className="font-bold text-gray-500 text-xs">익명 · 2시간 전</div>
          </div>

          <div className="font-extrabold mb-5 text-lg leading-[23.4px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
            콘서타 1주차 후기, 오후에 살짝 예민해져요
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
                  src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fd56f1bf80e3434cc00cc898c29df9c362f23fc35.svg?generation=1778677418392682&amp;alt=media"
                  className="block size-full"
                  alt=""
                />
              </div>
              <div className="font-bold">공감 12</div>
            </div>
            <div className="items-center flex grow justify-center bg-purple-100 shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] basis-0 gap-1.5 p-2 rounded-[0.875rem]">
              <div className="overflow-hidden w-[10px] h-[10px]">
                <img
                  src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2Fdf2703919175f9503d8dbe6dc130030c0dfd0974.svg?generation=1778677418398252&amp;alt=media"
                  className="block size-full"
                  alt=""
                />
              </div>
              <div className="font-bold">댓글 8</div>
            </div>
          </div>

          <div className="h-px mt-4 mb-4 bg-purple-50" />
          <div className="font-bold mb-2 text-gray-600">댓글 8</div>

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
                src="https://storage.googleapis.com/download/storage/v1/b/prd-storytodesign.appspot.com/o/h2d-ext-asset%2F3caa747b918bbc5b5d58d1adcb49875f2ddc837b.svg?generation=1778677418442128&amp;alt=media"
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
