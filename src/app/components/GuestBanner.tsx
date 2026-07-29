import React from 'react';
import { useNavigate } from 'react-router';
import { exitGuestMode } from '../guest';
import { clearGuestStore } from '../mocks/guest-store';

export default function GuestBanner() {
  const navigate = useNavigate();

  function handleSignup() {
    exitGuestMode();
    clearGuestStore();
    navigate('/signup');
  }

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-purple-50 border-b border-purple-100">
      <span className="text-xs text-purple-700">지금 둘러보기 중이에요</span>
      <button
        type="button"
        onClick={handleSignup}
        className="text-xs font-semibold text-purple-600 active:text-purple-800"
      >
        회원가입하기 →
      </button>
    </div>
  );
}
