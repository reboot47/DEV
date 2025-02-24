'use client';

import { motion } from 'framer-motion';
import { PhoneVerification } from '@/components/auth/PhoneVerification';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-gray-light">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-navy-dark mb-2">
          LINEBUZZ
        </h1>
        <p className="text-gray-medium">
          開発プラットフォーム
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          新規登録
        </h2>
        <PhoneVerification />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-gray-medium mt-6"
        >
          すでにアカウントをお持ちの方は
          <motion.a
            href="/login"
            className="text-navy-light hover:text-navy-dark font-medium ml-1"
            whileHover={{ scale: 1.05 }}
          >
            ログイン
          </motion.a>
        </motion.p>
      </motion.div>
    </div>
  );
}
