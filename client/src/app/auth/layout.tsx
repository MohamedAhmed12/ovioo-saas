'use client';

import '@/styles/app/auth/layout.scss';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-main-layout flex min-h-screen flex-col bg-[#f4f7fd]">
      {children}
    </main>
  );
}
