type AccountRestorePromptProps = {
  email?: string | null;
  isSubmitting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
};

export function AccountRestorePrompt({
  email,
  isSubmitting = false,
  onCancel,
  onConfirm,
  open,
}: AccountRestorePromptProps) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-20 flex items-end bg-gray-900/45">
      <div className="w-full rounded-t-[28px] bg-white px-5 pb-8 pt-6 shadow-[0_-12px_40px_rgba(15,23,42,0.18)]">
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-gray-200" />
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-red-400">Account Restore</div>
          <div className="mt-2 text-2xl font-extrabold text-gray-900" style={{ fontFamily: 'NanumSquare, system-ui' }}>
            계정을 다시 활성화할까요?
          </div>
          <div className="mt-3 text-sm leading-relaxed text-gray-500">
            탈퇴 신청 후 30일 이내에는 언제든지 계정을 되살릴 수 있어요.
            <br />
            다시 활성화하면 기존 기록과 설정을 그대로 이어서 사용할 수 있습니다.
          </div>
          {email ? <div className="mt-4 text-xs font-semibold text-gray-700">{email}</div> : null}
        </div>
        <div className="mt-7 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex h-[50px] w-full items-center justify-center rounded-xl bg-gray-900 text-base font-bold text-white disabled:opacity-60"
          >
            {isSubmitting ? '계정 복구 중...' : '다시 활성화하기'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex h-[46px] w-full items-center justify-center rounded-xl bg-gray-100 text-sm font-semibold text-gray-600 disabled:opacity-60"
          >
            아직 복구하지 않을게요
          </button>
        </div>
      </div>
    </div>
  );
}
