'use client';

import { MainLayout } from '@/components/layout/MainLayout';

export default function HomePage() {
  return (
    <MainLayout>
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          LINEBUZZ
        </h1>
        
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            コンテンツ準備中
          </h2>
          <p className="text-gray-600">
            より良いサービスを提供するため、現在コンテンツを準備中です。
            もうしばらくお待ちください。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: 'チャット機能',
              description: '他のユーザーとチャットで交流できます',
            },
            {
              title: 'プロフィール設定',
              description: 'あなたのプロフィールを充実させましょう',
            },
            {
              title: 'お知らせ機能',
              description: '最新の情報をお届けします',
            },
            {
              title: 'その他の機能',
              description: '順次公開予定です',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-4 shadow-md transition-transform hover:scale-105"
            >
              <h3 className="mb-2 font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
