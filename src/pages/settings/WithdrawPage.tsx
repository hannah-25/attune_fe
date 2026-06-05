import React, { useEffect, useState } from 'react';
import emotionImage from '@src/assets/emotion7.png';
import { AlertTriangle, BookOpen, FileText, MessageSquare, Pill, Users } from 'lucide-react';
import { useNavigate } from 'react-router';
import { requestAccountWithdrawal } from '../../app/api/auth';
import { ApiError, clearAccessToken } from '../../app/api/client';
import { getMyProfile } from '../../app/api/user';
import { exitGuestMode, isGuestMode } from '../../app/guest';
import { clearGuestStore } from '../../app/mocks/guest-store';
import { markPendingRestoreEmail } from '../../app/withdrawal-restore';
import { NavBackButton } from '../../app/components/NavButtons';
import { TopBar } from '../../app/components/TopBar';

const DELETE_ITEMS = [
  { icon: BookOpen, text: '일지 기록' },
  { icon: Pill, text: '복약 이력' },
  { icon: MessageSquare, text: '상담 기록' },
  { icon: FileText, text: '리포트' },
  { icon: Users, text: '커뮤니티 글·댓글' },
];

export default function WithdrawPage() {
  const navigate = useNavigate();
  const guestMode = isGuestMode();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoadingProfile, setIsLoadingProfile] = useState(!guestMode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let ignore = false;

    if (guestMode) {
      setIsLoadingProfile(false);
      setError('게스트 모드에서는 회원 탈퇴를 신청할 수 없어요.');
      return () => {
        ignore = true;
      };
    }

    getMyProfile()
      .then((profile) => {
        if (ignore) return;
        setEmail(profile.email);
      })
      .catch((err) => {
        console.error('Failed to load profile:', err);
        if (!ignore) setError('계정 정보를 불러오지 못했습니다.');
      })
      .finally(() => {
        if (!ignore) setIsLoadingProfile(false);
      });

    return () => {
      ignore = true;
    };
  }, [guestMode]);

  const canSubmit = !guestMode && !isSubmitting;

  const handleContinue = () => {
    navigate('/settings');
  };

  const handleExitToSplash = () => {
    navigate('/splash', { replace: true });
  };

  const handleSubmit = async () => {
    if (guestMode) {
      setError('게스트 모드에서는 회원 탈퇴를 신청할 수 없어요.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await requestAccountWithdrawal(password);
      if (email) {
        markPendingRestoreEmail(email);
      }
      clearAccessToken();
      exitGuestMode();
      clearGuestStore();
      setSubmitted(true);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401) {
          setError(err.backendMessage ?? '비밀번호가 올바르지 않습니다.');
          return;
        }
        if (err.backendMessage) {
          setError(err.backendMessage);
          return;
        }
      }

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('탈퇴 신청에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }
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
        <TopBar left={<NavBackButton onClick={handleExitToSplash} />} title="탈퇴 신청 완료" />
        <div className="flex flex-col items-center justify-center grow gap-3 px-5 pb-16">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-red-50 text-red-500">
            <AlertTriangle className="w-10 h-10" strokeWidth={2.2} />
          </div>
          <div className="font-extrabold text-lg text-gray-900 mt-1">탈퇴 신청이 접수되었어요</div>
          <div className="text-gray-500 text-xs text-center leading-relaxed">
            {email ? `${email} 계정은 지금부터 30일 동안 보관됩니다.` : '계정은 지금부터 30일 동안 보관됩니다.'}
            <br />
            유예 기간 안에 다시 로그인하면 탈퇴를 취소할 수 있어요.
          </div>
          <button
            type="button"
            onClick={handleExitToSplash}
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
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar left={<NavBackButton />} title="회원 탈퇴" centered />
        <div className="flex flex-col grow min-h-0 overflow-y-auto overscroll-contain basis-[0%] gap-5 pt-3 pr-5 pb-8 pl-5">
          <div className="flex items-center justify-center text-center pt-1 pr-0 pb-1 pl-0">
            <div className="w-36 h-36">
              <img src={emotionImage} alt="" className="w-full h-full object-contain" />
            </div>
          </div>
          <div className="font-extrabold text-center text-2xl leading-[28.6px]" style={{ fontFamily: 'NanumSquare, system-ui' }}>
            <span className="text-center">정말 떠나시겠어요?</span>
          </div>
          <div className="text-center text-gray-500 leading-normal">
            <span className="text-center">탈퇴 신청 후 </span><b className="font-bold text-center text-gray-900"><span className="text-center">30일간 유예 기간</span></b><span className="text-center">이 있어요.</span><br />
            <span className="text-center">그동안 로그인하면 취소할 수 있습니다.</span>
          </div>
          <div className="bg-red-50 border border-red-100 shadow-[rgba(120,40,40,0.05)_0px_4px_14px_0px,_rgba(120,40,40,0.03)_0px_1px_2px_0px] py-5 px-4 rounded-[1.125rem]">
            <div className="flex items-center gap-2 font-bold mb-4 text-red-900">
              <AlertTriangle className="w-4 h-4" strokeWidth={2.2} />
              <span>30일 후 영구 삭제되는 데이터</span>
            </div>
            {DELETE_ITEMS.map((item) => (
              <div key={item.text} className="items-center flex gap-2 pt-0.5 pr-0 pb-0.5 pl-0">
                <item.icon className="w-3.5 h-3.5 text-red-700" strokeWidth={2.4} />
                {item.text}
              </div>
            ))}
          </div>
          <div className="px-1 text-xs leading-relaxed text-gray-500">
            {guestMode
              ? '게스트 모드에서는 탈퇴 신청이 필요하지 않습니다.'
              : isLoadingProfile
                ? '계정 정보를 확인하는 중이지만 탈퇴 요청은 진행할 수 있어요.'
                : email
                  ? `${email} 계정으로 탈퇴를 신청합니다.`
                  : '탈퇴 신청 전 계정 정보를 확인해 주세요.'}
          </div>
          <div className="grow basis-[0%]"></div>
          <div className="px-1 pt-1 text-gray-900 text-sm font-bold leading-normal">
            이메일 로그인 계정은 비밀번호를 입력해 주세요. 소셜 로그인 계정은 비워두고 진행할 수 있어요.
          </div>
          <input
            id="withdraw-password"
            type="password"
            autoComplete="current-password"
            placeholder="현재 비밀번호 (이메일 로그인만)"
            aria-label="현재 비밀번호"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full h-[80px] bg-white border border-gray-200 text-gray-900 text-base placeholder:text-gray-300 px-5 py-4 rounded-[1.125rem] outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
          {error ? <div className="px-1 text-red-500 text-xs">{error}</div> : null}
          <button
            type="button"
            onClick={handleContinue}
            className="items-center flex font-bold justify-center w-full h-[50px] bg-gray-900 shadow-[rgba(0,0,0,0.06)_0px_4px_0px_0px] text-white text-base tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.5625rem]"
          >
            <span className="block">계속 사용하기</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="items-center flex font-bold justify-center w-full h-11 bg-transparent text-red-700 tracking-tight min-h-11 pt-0 pr-5 pb-0 pl-5 rounded-[1.375rem] disabled:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="block">{isSubmitting ? '탈퇴 신청 중...' : '탈퇴 신청'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
