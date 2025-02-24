'use client';

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative text-center"
      >
        {/* デコレーティブな背景要素 */}
        <motion.div
          className="absolute -left-8 -top-8 h-64 w-64 rounded-full bg-gradient-to-r from-pink-light/10 to-navy-light/10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-8 -right-8 h-64 w-64 rounded-full bg-gradient-to-l from-navy/10 to-pink-light/10"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* メインのロゴテキスト */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.h1
            className="font-heading text-7xl font-bold text-navy md:text-8xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            LINE
            <span className="bg-gradient-to-r from-navy to-navy-light bg-clip-text text-transparent">
              BUZZ
            </span>
          </motion.h1>
        </motion.div>

        {/* アクセントライン */}
        <motion.div
          className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-navy via-navy-light to-pink-light"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 96, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </main>
  );
}
