'use client';

import { MainLayout } from '@/components/layout/MainLayout';

export default function NotificationsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          お知らせ
        </h1>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-600 text-center">
              お知らせ機能は現在準備中です。<br />
              もうしばらくお待ちください。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-4 shadow-md space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-100" />
              </div>
              <div className="h-3 w-full rounded bg-gray-100" />
              <div className="h-3 w-3/4 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
