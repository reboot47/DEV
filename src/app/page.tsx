'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRightIcon, CodeBracketIcon, UserGroupIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: <CodeBracketIcon className="h-8 w-8" />,
    title: '高度な開発環境',
    description: '最新のツールとフレームワークを活用した開発環境を提供',
  },
  {
    icon: <UserGroupIcon className="h-8 w-8" />,
    title: 'チーム協業',
    description: 'リアルタイムのコミュニケーションと効率的な協業を実現',
  },
  {
    icon: <LightBulbIcon className="h-8 w-8" />,
    title: 'アイデア創出',
    description: '革新的なアイデアの共有と実現をサポート',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        {/* 装飾的な背景要素 */}
        <motion.div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full"
          style={{ background: 'rgba(72, 52, 212, 0.05)' }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full"
          style={{ background: 'rgba(253, 167, 223, 0.05)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block"
            >
              <h1 className="font-heading text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl">
                <span style={{ color: 'var(--color-navy-dark)' }}>LINE</span>
                <span className="text-gradient">BUZZ</span>
              </h1>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 w-0"
                style={{ 
                  background: 'linear-gradient(to right, var(--color-navy-dark), var(--color-navy-light), var(--color-pink-light))'
                }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl"
              style={{ color: 'var(--color-gray-medium)' }}
            >
              次世代の開発プラットフォーム
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            >
              <Button
                as="a"
                href="/signup"
                className="group flex items-center gap-2"
              >
                新規登録
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                as="a"
                href="/login"
                variant="outline"
                className="group flex items-center gap-2"
              >
                ログイン
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="relative px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                className="group relative rounded-2xl bg-white p-6 shadow-lg transition-transform hover:-translate-y-1"
              >
                <div 
                  className="mb-4 inline-block rounded-lg p-3"
                  style={{ 
                    background: 'rgba(72, 52, 212, 0.1)',
                    color: 'var(--color-navy-dark)'
                  }}
                >
                  {feature.icon}
                </div>
                <h3 
                  className="mb-2 text-xl font-bold"
                  style={{ color: 'var(--color-navy-dark)' }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--color-gray-medium)' }}>
                  {feature.description}
                </p>
                <motion.div
                  className="absolute bottom-0 left-0 h-1 w-0 rounded-b-2xl"
                  style={{ 
                    background: 'linear-gradient(to right, var(--color-navy-light), var(--color-pink-light))'
                  }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
