import React, { useState } from 'react';
import logoImage from '@src/assets/logo.png';
import { Bell, CalendarDays, Camera, Check, ChevronRight, Globe2, HelpCircle, Link2, LogOut, Megaphone, Moon, Pencil, Settings, Shield, X } from 'lucide-react';
import { ScrollArea } from '@/components/ScrollArea';
import { TabBar } from '@/components/TabBar';
import { HeaderIconButton, TopBar } from '../../app/components/TopBar';

export default function MyPage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nickname, setNickname] = useState('윤나래');
  const [draftNickname, setDraftNickname] = useState(nickname);

  const startProfileEdit = () => {
    setDraftNickname(nickname);
    setIsEditingProfile(true);
  };

  const saveProfile = () => {
    const nextNickname = draftNickname.trim();
    if (nextNickname) setNickname(nextNickname);
    setIsEditingProfile(false);
  };

  return (
    <div
      className="w-full h-dvh bg-gray-100 text-sm flex flex-col"
      style={{ fontFamily: "NanumSquare, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <TopBar title="" right={<HeaderIconButton icon={<Settings className="h-4 w-4 text-gray-700" strokeWidth={2.35} />} />} />
        <ScrollArea>
          <div className="text-center pt-1 pr-0 pb-5 pl-0">
            <button
              type="button"
              aria-label={isEditingProfile ? '프로필 사진 변경' : '프로필 편집'}
              onClick={() => { if (!isEditingProfile) startProfileEdit(); }}
              className="inline-block relative text-center cursor-pointer bg-transparent border-0 p-0"
            >
              <div className="flex items-center justify-center text-center w-24 h-24">
                <img src={logoImage} alt="attune" className="w-full h-full object-contain" />
              </div>
              <div className="items-center flex justify-center absolute text-center w-7 h-7 right-[-4px] bottom-[-2px] bg-white shadow-[rgba(0,0,0,0.12)_0px_2px_6px_0px] ring-1 ring-gray-200 rounded-[0.875rem]">
                {isEditingProfile ? <Camera className="w-3.5 h-3.5 text-gray-500" strokeWidth={2.25} /> : <Pencil className="w-3.5 h-3.5 text-gray-500" strokeWidth={2.25} />}
              </div>
            </button>
            {isEditingProfile ? (
              <div className="flex items-center justify-center mt-3 gap-1.5">
                <input
                  type="text"
                  value={draftNickname}
                  onChange={(event) => setDraftNickname(event.target.value)}
                  className="w-[150px] h-10 bg-white border border-purple-200 shadow-[rgba(60,40,90,0.05)_0px_2px_8px_0px] text-center text-lg font-extrabold px-3 rounded-xl outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                  style={{ fontFamily: 'NanumSquare, system-ui' }}
                  aria-label="닉네임"
                />
                <button type="button" onClick={() => setIsEditingProfile(false)} className="items-center flex justify-center w-9 h-9 bg-white border border-gray-200 text-gray-500 shadow-[rgba(60,40,90,0.05)_0px_2px_8px_0px] rounded-full" aria-label="프로필 편집 취소">
                  <X className="w-4 h-4" strokeWidth={2.25} />
                </button>
                <button type="button" onClick={saveProfile} className="items-center flex justify-center w-9 h-9 bg-purple-500 text-white shadow-[rgba(60,40,90,0.12)_0px_3px_10px_0px] rounded-full" aria-label="프로필 저장">
                  <Check className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <div className="font-extrabold text-center mt-3 text-2xl" style={{ fontFamily: 'NanumSquare, system-ui' }}>{nickname}</div>
            )}
            <div className="text-center mt-[2px] text-gray-600">main@gmail.com</div>
            <div className="flex justify-center text-center mt-3 gap-1.5">
              <Chip>attune 14주차</Chip>
              <Chip>기록 124개</Chip>
            </div>
          </div>
          <Section title="계정">
            <MenuRow icon={<Link2 />} label="소셜 연동" value="Google · Apple" />
            <MenuRow icon={<Shield />} label="비밀번호 변경" last />
          </Section>
          <Section title="설정">
            <MenuRow icon={<Bell />} label="알림" />
            <MenuRow icon={<CalendarDays />} label="캘린더 연동" value="1개 연결" />
            <MenuRow icon={<Globe2 />} label="언어" value="한국어" />
            <MenuRow icon={<Moon />} label="테마" value="자동" last />
          </Section>
          <Section title="지원">
            <MenuRow icon={<Megaphone />} label="공지사항" />
            <MenuRow icon={<HelpCircle />} label="문의하기" />
            <MenuRow icon={<LogOut />} label="로그아웃" last hideChevron />
          </Section>
          <button type="button" className="block mt-3 ml-1 bg-transparent border-0 p-0 text-xs font-medium text-gray-400 underline underline-offset-2">
            회원 탈퇴
          </button>
        </ScrollArea>
        <TabBar />
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <div className="items-center flex font-semibold text-center whitespace-nowrap bg-purple-100 border-black/0 border text-purple-800 text-xs gap-1.5 tracking-tight pt-[7px] pr-[11px] pb-[7px] pl-[11px] rounded-[62.4375rem]">{children}</div>;
}

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <>
      <div className="font-bold text-gray-600 text-xs pt-0 pr-1 pb-1.5 pl-1">{title}</div>
      <div className="mb-3 bg-white shadow-[rgba(60,40,90,0.07)_0px_4px_14px_0px,_rgba(60,40,90,0.04)_0px_1px_2px_0px] p-1 rounded-2xl">{children}</div>
    </>
  );
}

function MenuRow({ hideChevron, icon, label, last, value }: { hideChevron?: boolean; icon: React.ReactElement; label: string; last?: boolean; value?: string }) {
  return (
    <div className={`items-center flex pt-[13px] pr-[14px] pb-[13px] pl-[14px] ${last ? '' : 'border-b'}`} style={last ? undefined : { borderBottomColor: 'rgb(233, 228, 220)' }}>
      {React.cloneElement(icon, { className: 'w-4 h-4 text-gray-500 mr-2', strokeWidth: 2.35 })}
      <div className="grow font-semibold basis-[0%]">{label}</div>
      {value ? <div className="mr-[6px] text-gray-600">{value}</div> : null}
      {!hideChevron ? <ChevronRight className="w-[11px] h-[11px] text-gray-400" strokeWidth={2.5} /> : null}
    </div>
  );
}
