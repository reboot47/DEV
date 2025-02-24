'use client';

import { MainLayout } from '@/components/layout/MainLayout';

export default function ChatPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          チャット
        </h1>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-600 text-center">
              チャット機能は現在準備中です。<br />
              もうしばらくお待ちください。
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 rounded-lg bg-white p-4 shadow-md"
            >
              <div className="h-12 w-12 rounded-full bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-32 rounded bg-gray-100" />
              </div>
              <div className="text-xs text-gray-400">
                準備中
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
