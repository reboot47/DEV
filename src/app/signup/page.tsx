'use client';

import { motion } from 'framer-motion';
import { SignupProvider, useSignup } from '@/contexts/SignupContext';
import { PhoneVerification } from '@/components/auth/PhoneVerification';
import { PasswordSetup } from '@/components/auth/PasswordSetup';
import { ProfileSetup } from '@/components/auth/ProfileSetup';
import { ProfileConfirmation } from '@/components/auth/ProfileConfirmation';

function SignupFlow() {
  const { currentStep } = useSignup();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      {currentStep === 'phone' && <PhoneVerification />}
      {currentStep === 'password' && <PasswordSetup />}
      {currentStep === 'profile' && <ProfileSetup />}
      {currentStep === 'confirm' && <ProfileConfirmation />}
    </div>
  );
}

export default function SignupPage() {
  return (
    <SignupProvider>
      <SignupFlow />
    </SignupProvider>
  );
}
