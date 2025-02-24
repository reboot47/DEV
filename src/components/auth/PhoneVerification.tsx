import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon } from '@heroicons/react/24/outline';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const PhoneVerification = () => {
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    setIsLoading(true);
    // 実際のAPI呼び出しの代わりにタイマー
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep('code');
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    // 実際のAPI呼び出しの代わりにタイマー
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // 成功後の処理をここに
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <div className="space-y-6">
        {step === 'phone' ? (
          <>
            <Input
              label="電話番号"
              type="tel"
              placeholder="090-1234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              icon={<PhoneIcon className="w-5 h-5" />}
            />
            <Button
              onClick={handleSendCode}
              isLoading={isLoading}
              className="w-full"
            >
              認証コードを送信
            </Button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Input
              label="認証コード"
              type="number"
              placeholder="6桁のコードを入力"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setStep('phone')}
                className="w-full"
              >
                戻る
              </Button>
              <Button
                onClick={handleVerifyCode}
                isLoading={isLoading}
                className="w-full"
              >
                認証
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
