import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopBar } from '../../app/components/TopBar';
import { NavCloseButton } from '../../app/components/NavButtons';
import { getMyProfile } from '../../app/api/user';
import { useEffect } from 'react';
import { createSupportInquiry, type SupportInquiryType } from '../../app/api/support';

const INQUIRY_TYPES: Array<{ label: string; value: SupportInquiryType }> = [
  { label: '버그 신고', value: 'BUG' },
  { label: '기능 제안', value: 'FEATURE' },
  { label: '사용 문의', value: 'USAGE' },
  { label: '결제권 문의', value: 'PAYMENT' },
  { label: '기타', value: 'OTHER' },
];

export default function InquiryPage() {
  const navigate = useNavigate();
  const [type, setType] = useState<SupportInquiryType | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    getMyProfile()
      .then((profile) => setEmail(profile.email))
      .catch(() => {});
  }, []);

  const canSubmit = type !== null && title.trim().length > 0 && content.trim().length > 0 && email.trim().length > 0 && !isSubmitting;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await createSupportInquiry({
        type,
        title: title.trim(),
        content: content.trim(),
        email: email.trim(),
      });
      setSubmitted(true);
    } catch {
      setSubmitError('문의 제출에 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className="w-full h-full bg-gray-50 text-sm flex flex-col"
        style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <TopBar title="문의하기" right={<NavCloseButton />} />
        <div className="flex flex-col items-center justify-center grow gap-3 px-5 pb-16">
          <div className="text-4xl">✉️</div>
          <div className="font-extrabold text-lg text-gray-900 mt-1">문의가 접수되었어요</div>
          <div className="text-gray-500 text-xs text-center leading-relaxed">
            입력하신 이메일로 답변 드릴게요.<br />보통 1~3 영업일 내에 회신해드립니다.
          </div>
          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="mt-6 w-full h-[46px] bg-[rgb(31,27,46)] text-white font-bold rounded-xl"
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full bg-gray-50 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <TopBar title="문의하기" right={<NavCloseButton />} />
      <div className="grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] px-5 pt-5 pb-8 flex flex-col gap-5">

        {/* 문의 유형 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-700 text-xs">문의 유형</label>
          <div className="flex flex-wrap gap-2">
            {INQUIRY_TYPES.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setType(item.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  type === item.value
                    ? 'bg-purple-100 border-[rgb(185,166,255)] text-purple-800'
                    : 'bg-white border-gray-200 text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-700 text-xs">제목</label>
          <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
            <input
              type="text"
              placeholder="문의 제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className="w-full bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>

        {/* 내용 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-700 text-xs">내용</label>
          <div className="bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 py-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
            <textarea
              placeholder="문의 내용을 자세히 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={5000}
              rows={6}
              className="w-full bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none resize-none leading-relaxed"
            />
            <div className="text-right text-[11px] text-gray-400">{content.length}/5000</div>
          </div>
        </div>

        {/* 이메일 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold text-gray-700 text-xs">답변 받을 이메일</label>
          <div className="flex flex-col justify-center w-full h-[54px] bg-white border border-gray-300 shadow-[rgba(60,40,90,0.04)_0px_2px_8px_0px] px-3 rounded-xl focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100">
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
              className="w-full bg-transparent text-gray-900 text-sm placeholder:text-gray-400 outline-none"
            />
          </div>
        </div>

        {submitError ? <div className="text-red-500 text-xs">{submitError}</div> : null}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-[46px] bg-[rgb(31,27,46)] text-white font-bold rounded-xl disabled:opacity-50 transition-all active:scale-[0.97]"
        >
          {isSubmitting ? '제출 중...' : '문의 제출하기'}
        </button>
      </div>
    </div>
  );
}
