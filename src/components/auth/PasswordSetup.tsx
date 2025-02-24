import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '@/contexts/SignupContext';

const passwordSchema = z.object({
  password: z.string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'パスワードは英字と数字を含む必要があります'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export function PasswordSetup() {
  const { updateSignupData, setStep } = useSignup();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      setIsLoading(true);
      setError('');

      // パスワードの一致を確認
      if (data.password !== data.confirmPassword) {
        setError('パスワードが一致しません');
        return;
      }

      console.log('パスワード設定:', {
        passwordLength: data.password.length,
        matches: data.password === data.confirmPassword
      });

      // パスワードをコンテキストに保存
      updateSignupData({ password: data.password });
      
      console.log('パスワード保存完了、プロフィール設定へ進みます');
      // プロフィール設定ステップへ進む
      setStep('profile');
    } catch (err) {
      console.error('パスワード設定エラー:', err);
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-navy-dark)' }}>
          パスワードを設定
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
          安全なパスワードを設定してください
        </p>
        
        <Input
          type="password"
          label="パスワード"
          placeholder="8文字以上の英数字"
          error={form.formState.errors.password?.message}
          {...form.register('password')}
        />

        <Input
          type="password"
          label="パスワード（確認）"
          placeholder="パスワードを再入力"
          error={form.formState.errors.confirmPassword?.message}
          {...form.register('confirmPassword')}
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
        >
          次へ
        </Button>
      </form>
    </motion.div>
  );
}
