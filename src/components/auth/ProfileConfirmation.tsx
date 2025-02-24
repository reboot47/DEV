import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useSignup } from '@/contexts/SignupContext';
import { useRouter } from 'next/navigation';

export function ProfileConfirmation() {
  const { signupData, setStep } = useSignup();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getGenderLabel = (gender: string) => {
    const labels = {
      male: '男性',
      female: '女性',
      other: 'その他',
    };
    return labels[gender as keyof typeof labels] || gender;
  };

  const handleSubmit = async () => {
    if (!signupData) {
      console.error('No signup data available');
      setError('登録データが見つかりません');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      // データの検証
      console.log('Validating registration data:', {
        phone: signupData.phone,
        name: signupData.name,
        gender: signupData.gender,
        birthDate: signupData.birthDate,
        hasPassword: !!signupData.password,
        hasProfileImage: !!signupData.profileImage
      });

      // birthDateの形式を確認
      const birthDate = new Date(signupData.birthDate);
      if (isNaN(birthDate.getTime())) {
        console.error('Invalid birth date:', signupData.birthDate);
        setError('生年月日の形式が正しくありません');
        return;
      }

      const registrationData = {
        ...signupData,
        birthDate: birthDate.toISOString()
      };

      console.log('Sending registration request...');

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      console.log('Registration response:', {
        status: response.status,
        ok: response.ok,
        data
      });

      if (!response.ok) {
        throw new Error(data.error || '登録に失敗しました');
      }

      console.log('Registration successful:', data);
      
      // 登録成功後の処理
      router.push('/home');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : '登録処理でエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold" style={{ color: 'var(--color-navy-dark)' }}>
        プロフィール確認
      </h2>

      <div className="space-y-6">
        <div className="flex justify-center">
          {signupData.profileImage && (
            <img
              src={signupData.profileImage}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover"
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">電話番号</p>
            <p className="text-base">{signupData.phone}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">名前</p>
            <p className="text-base">{signupData.name}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">性別</p>
            <p className="text-base">{getGenderLabel(signupData.gender)}</p>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">生年月日</p>
            <p className="text-base">{formatDate(signupData.birthDate)}</p>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => setStep('profile')}
            disabled={isLoading}
          >
            戻る
          </Button>
          <Button
            type="button"
            className="flex-1"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            登録を完了
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
