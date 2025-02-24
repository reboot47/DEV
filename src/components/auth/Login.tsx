'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { motion } from 'framer-motion';

type LoginFormData = {
  phone: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError('');

      console.log('Attempting login:', { phone: data.phone });

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'ログインに失敗しました');
      }

      console.log('Login successful');
      router.push('/home');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'ログイン中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          ログイン
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Input
              label="電話番号"
              placeholder="080XXXXXXXX"
              error={errors.phone?.message}
              className="bg-gray-50 border-gray-200 focus:bg-white transition-colors duration-200"
              {...register('phone', {
                required: '電話番号を入力してください',
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: '有効な電話番号を入力してください',
                },
              })}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Input
              type="password"
              label="パスワード"
              placeholder="••••••••"
              error={errors.password?.message}
              className="bg-gray-50 border-gray-200 focus:bg-white transition-colors duration-200"
              {...register('password', {
                required: 'パスワードを入力してください',
                minLength: {
                  value: 8,
                  message: 'パスワードは8文字以上である必要があります',
                },
              })}
            />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full py-3 text-lg font-medium rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-200"
              isLoading={isLoading}
            >
              ログイン
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center space-y-4"
          >
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-indigo-600 hover:text-indigo-500 font-medium text-sm transition-colors duration-200"
            >
              アカウントをお持ちでない方はこちら
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
