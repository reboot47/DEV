import { ReactNode } from 'react';
import { FooterMenu } from './FooterMenu';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <main className="container mx-auto max-w-md px-4 py-6">
        {children}
      </main>
      <FooterMenu />
    </div>
  );
}
