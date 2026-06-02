import React from 'react';

type SocialMarkProps = {
  className?: string;
};

export function GoogleMark({ className }: SocialMarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#4285F4"
        d="M21.81 12.23c0-.71-.06-1.39-.19-2.04H12v3.86h5.5a4.7 4.7 0 0 1-2.04 3.09v2.56h3.3c1.93-1.78 3.05-4.41 3.05-7.47Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.76 0 5.08-.91 6.77-2.46l-3.3-2.56c-.91.61-2.08.98-3.47.98-2.67 0-4.93-1.8-5.74-4.22H2.86v2.64A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.26 13.74A5.98 5.98 0 0 1 5.94 12c0-.61.11-1.2.31-1.74V7.62H2.86A10 10 0 0 0 2 12c0 1.61.39 3.13 1.08 4.38l3.18-2.64Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.98c1.5 0 2.84.51 3.89 1.53l2.91-2.91C17.07 2.98 14.76 2 12 2A10 10 0 0 0 2.86 7.62l3.39 2.64c.81-2.42 3.08-4.28 5.75-4.28Z"
      />
    </svg>
  );
}

export function AppleMark({ className }: SocialMarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M16.68 12.62c.02 2.32 2.04 3.09 2.06 3.1-.02.05-.32 1.08-1.05 2.14-.63.91-1.29 1.81-2.32 1.83-1.01.02-1.34-.6-2.5-.6-1.17 0-1.53.58-2.48.62-1 .04-1.76-.99-2.4-1.89-1.3-1.85-2.3-5.22-.96-7.55.67-1.16 1.87-1.9 3.16-1.92.98-.02 1.9.66 2.5.66.59 0 1.7-.81 2.87-.69.49.02 1.87.2 2.76 1.5-.07.04-1.64.95-1.63 2.8ZM14.97 6.19c.53-.64.88-1.54.79-2.43-.76.03-1.68.51-2.23 1.14-.49.57-.92 1.47-.8 2.34.85.06 1.71-.43 2.24-1.05Z"
      />
    </svg>
  );
}

export function KakaoMark({ className }: SocialMarkProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 4C7.03 4 3 7.13 3 11c0 2.39 1.54 4.49 3.87 5.74l-.83 3.17a.38.38 0 0 0 .57.42l3.79-2.5c.52.08 1.05.12 1.6.12 4.97 0 9-3.13 9-6.95S16.97 4 12 4Z"
      />
      <path fill="#FEE500" d="M8.65 9.15h1.65v1.42l1.4-1.42h2.08l-1.98 1.94 2.15 2.76h-2.04l-1.27-1.71-.34.33v1.38H8.65V9.15Z" />
    </svg>
  );
}
