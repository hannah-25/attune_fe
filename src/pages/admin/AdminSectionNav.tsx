import { NavLink } from 'react-router';

const sections = [
  { to: '/admin', label: '회원 관리', end: true },
  { to: '/admin/notices', label: '공지 관리' },
  { to: '/admin/terms', label: '약관 등록' },
  { to: '/admin/marketing', label: '마케팅 발송' },
];

export default function AdminSectionNav() {
  return (
    <nav aria-label="관리자 메뉴" className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1240px] gap-1 overflow-x-auto px-4 py-2 md:px-6">
        {sections.map((section) => (
          <NavLink
            key={section.to}
            to={section.to}
            end={section.end}
            className={({ isActive }) =>
              `shrink-0 rounded-lg px-3.5 py-2 text-xs font-extrabold transition ${
                isActive
                  ? 'bg-purple-100 text-purple-800'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
              }`
            }
          >
            {section.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
