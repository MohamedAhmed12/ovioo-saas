'use client';

import '@/styles/app/auth/layout.scss';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col auth-main-layout pt-32 pb-14 pl-80 pr-8 bg-[#f4f7fd] dark:bg-[#20212c]">
      {children}
    </main>
  );
}
