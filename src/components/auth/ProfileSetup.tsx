import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '@/contexts/SignupContext';
import DatePicker from 'react-datepicker';
import Compressor from 'compressorjs';
import "react-datepicker/dist/react-datepicker.css";
import { CameraIcon } from '@heroicons/react/24/outline';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const profileSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: '性別を選択してください',
  }),
  birthDate: z.date({
    required_error: '生年月日を選択してください',
  }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSetup() {
  const { updateSignupData, setStep, signupData } = useSignup();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      gender: 'other',
      birthDate: null,
    },
  });

  const handleImageUpload = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        maxWidth: 800,
        maxHeight: 800,
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        },
        error(err) {
          reject(err);
        },
      });
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        setError('JPG、PNG、WebP形式の画像を選択してください');
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('ファイルサイズは5MB以下にしてください');
        return;
      }

      const compressedImage = await handleImageUpload(file);
      setPreviewImage(compressedImage);
      setError('');
    } catch (err) {
      setError('画像のアップロードに失敗しました');
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      setError('');

      if (!previewImage) {
        setError('プロフィール画像を選択してください');
        return;
      }

      console.log('Submitting profile data:', {
        ...data,
        profileImage: previewImage ? 'exists' : 'null'
      });

      // プロフィール情報をコンテキストに保存
      updateSignupData({
        name: data.name,
        gender: data.gender,
        birthDate: data.birthDate,
        profileImage: previewImage,
      });
      
      console.log('Profile data saved, moving to confirmation step');
      // 確認ステップへ進む
      setStep('confirm');
    } catch (err) {
      console.error('Profile setup error:', err);
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
          プロフィール設定
        </h2>

        {/* プロフィール画像 */}
        <div className="flex flex-col items-center space-y-4">
          <div 
            className="relative h-32 w-32 cursor-pointer overflow-hidden rounded-full bg-gray-100"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <CameraIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="text-sm text-blue-600"
            onClick={() => fileInputRef.current?.click()}
          >
            画像を{previewImage ? '変更' : '選択'}
          </button>
        </div>

        <Input
          label="名前"
          placeholder="名前を入力"
          error={form.formState.errors.name?.message}
          {...form.register('name')}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            性別
          </label>
          <div className="flex gap-4">
            {[
              { value: 'male', label: '男性' },
              { value: 'female', label: '女性' },
              { value: 'other', label: 'その他' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center space-x-2"
              >
                <input
                  type="radio"
                  value={option.value}
                  {...form.register('gender')}
                  className="h-4 w-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {form.formState.errors.gender && (
            <p className="text-sm text-red-500">
              {form.formState.errors.gender.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            生年月日
          </label>
          <Controller
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="yyyy/MM/dd"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText="生年月日を選択"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            )}
          />
          {form.formState.errors.birthDate && (
            <p className="text-sm text-red-500">
              {form.formState.errors.birthDate.message}
            </p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => setStep('password')}
            disabled={isLoading}
          >
            戻る
          </Button>
          <Button
            type="submit"
            className="flex-1"
            isLoading={isLoading}
          >
            次へ
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
