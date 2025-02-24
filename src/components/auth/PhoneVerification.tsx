import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '@/contexts/SignupContext';

const phoneSchema = z.object({
  phone: z.string()
    .min(11, '電話番号を正しく入力してください')
    .max(11, '電話番号を正しく入力してください')
    .regex(/^0[789]0\d{8}$/, '有効な携帯電話番号を入力してください'),
});

const codeSchema = z.object({
  code: z.string()
    .length(6, '6桁の認証コードを入力してください')
    .regex(/^\d{6}$/, '数字のみを入力してください'),
});

type PhoneFormData = z.infer<typeof phoneSchema>;
type CodeFormData = z.infer<typeof codeSchema>;

export function PhoneVerification() {
  const { updateSignupData, setStep } = useSignup();
  const [step, setVerificationStep] = useState<'phone' | 'code' | 'password'>('phone');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toISOString()}: ${info}`]);
  };

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
  });

  const codeForm = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: ''
    }
  });

  const startResendTimer = () => {
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 認証コードを送信する関数
  const onPhoneSubmit = async (data: PhoneFormData) => {
    try {
      setIsLoading(true);
      setError('');
      addDebugInfo(`電話番号送信: ${data.phone}`);

      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: data.phone }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || '認証コードの送信に失敗しました');
      }

      setPhone(data.phone);
      setVerificationStep('code');
      setResendTimer(60);

      // タイマーの開始
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      addDebugInfo('認証コード送信成功');

      // 開発環境では認証コードを表示
      if (process.env.NODE_ENV === 'development') {
        setError('開発環境用認証コード: 123456');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '認証コードの送信に失敗しました';
      addDebugInfo(`エラー発生: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 認証コードを検証する関数
  const onCodeSubmit = async (data: CodeFormData) => {
    try {
      setIsLoading(true);
      setError('');
      addDebugInfo(`認証コード検証開始: ${data.code}`);

      // 開発環境での自動検証
      if (process.env.NODE_ENV === 'development' && data.code === '123456') {
        addDebugInfo('開発環境での認証成功');
        
        // 電話番号を保存してパスワード設定ステップへ
        updateSignupData({ phone });
        setStep('password');
        return;
      }

      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          code: data.code,
        }),
      });

      const responseData = await response.json();
      addDebugInfo(`APIレスポンス: ${JSON.stringify(responseData)}`);

      if (!response.ok) {
        throw new Error(responseData.error || '認証に失敗しました');
      }

      addDebugInfo('認証成功');
      console.log('認証成功');
      
      // 電話番号を保存してパスワード設定ステップへ
      updateSignupData({ phone });
      setStep('password');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '認証コードの検証に失敗しました';
      addDebugInfo(`エラー発生: ${errorMessage}`);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    await onPhoneSubmit({ phone });
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-6 shadow-lg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {step === 'phone' ? (
          <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-navy-dark)' }}>
              電話番号認証
            </h2>
            <Input
              label="電話番号"
              placeholder="例: 09012345678"
              error={phoneForm.formState.errors.phone?.message}
              {...phoneForm.register('phone')}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              認証コードを送信
            </Button>
          </form>
        ) : step === 'code' ? (
          <form onSubmit={codeForm.handleSubmit(onCodeSubmit)} className="space-y-4">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-navy-dark)' }}>
              認証コードを入力
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
              {phone}に送信された認証コードを入力してください
            </p>

            {process.env.NODE_ENV === 'development' && (
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      開発環境
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>認証コード: 123456</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Input
              label="認証コード"
              placeholder="123456"
              error={codeForm.formState.errors.code?.message}
              {...codeForm.register('code')}
            />

            {error && error.includes('開発環境') ? (
              <p className="text-sm text-blue-600">{error}</p>
            ) : error ? (
              <p className="text-sm text-red-500">{error}</p>
            ) : null}

            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              認証する
            </Button>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm text-gray-500"
                onClick={() => setVerificationStep('phone')}
              >
                電話番号を変更
              </button>

              <Button
                type="button"
                variant="text"
                onClick={handleResendCode}
                disabled={resendTimer > 0 || isLoading}
              >
                {resendTimer > 0
                  ? `再送信まで ${resendTimer}秒`
                  : '認証コードを再送信'
                }
              </Button>
            </div>
          </form>
        ) : (
          // パスワード設定ステップ
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--color-navy-dark)' }}>
              パスワード設定
            </h2>
            <p className="text-sm" style={{ color: 'var(--color-gray-medium)' }}>
              パスワードを設定してください
            </p>
          </div>
        )}

        {/* デバッグ情報 */}
        <div className="mt-4 rounded border border-gray-200 p-2">
          <p className="text-xs font-bold text-gray-500">デバッグ情報:</p>
          <pre className="mt-1 max-h-40 overflow-auto text-xs text-gray-500">
            {debugInfo.map((info, index) => (
              <div key={index}>{info}</div>
            ))}
          </pre>
        </div>
      </motion.div>
    </div>
  );
}
