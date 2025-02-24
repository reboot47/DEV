'use client';

import { MainLayout } from '@/components/layout/MainLayout';

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="text-center">
          <div className="mb-4 h-24 w-24 overflow-hidden rounded-full mx-auto bg-gray-200">
            {/* プロフィール画像のプレースホルダー */}
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            プロフィール
          </h1>
          <p className="text-sm text-gray-600">
            プロフィール機能は準備中です
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-900">
              今後追加予定の機能
            </h2>
            <ul className="list-inside list-disc space-y-2 text-gray-600">
              <li>プロフィール情報の編集</li>
              <li>プロフィール画像の変更</li>
              <li>自己紹介文の設定</li>
              <li>興味・関心の設定</li>
              <li>SNSアカウントの連携</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
