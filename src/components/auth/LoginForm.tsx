import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);
    // 実際のAPI呼び出しの代わりにタイマー
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // デモ用のエラー表示
    if (!phone || !password) {
      setError('電話番号とパスワードを入力してください');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-error/10 text-error px-4 py-3 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      <Input
        label="電話番号"
        type="tel"
        placeholder="090-1234-5678"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        icon={<PhoneIcon className="w-5 h-5" />}
      />

      <Input
        label="パスワード"
        type="password"
        placeholder="パスワードを入力"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<LockClosedIcon className="w-5 h-5" />}
      />

      <Button
        onClick={handleLogin}
        isLoading={isLoading}
        className="w-full"
      >
        ログイン
      </Button>

      <p className="text-center text-sm text-gray-medium">
        アカウントをお持ちでない方は
        <motion.a
          href="/signup"
          className="text-navy-light hover:text-navy-dark font-medium ml-1"
          whileHover={{ scale: 1.05 }}
        >
          新規登録
        </motion.a>
      </p>
    </motion.div>
  );
};
