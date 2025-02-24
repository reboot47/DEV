import { createContext, useContext, useState, ReactNode } from 'react';

type SignupStep = 'phone' | 'password' | 'profile' | 'confirm';

interface SignupData {
  phone: string;
  password: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  birthDate: Date | null;
  profileImage: string | null;
}

interface SignupContextType {
  currentStep: SignupStep;
  signupData: SignupData;
  setStep: (step: SignupStep) => void;
  updateSignupData: (data: Partial<SignupData>) => void;
}

const defaultSignupData: SignupData = {
  phone: '',
  password: '',
  name: '',
  gender: 'other',
  birthDate: null,
  profileImage: null,
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export function SignupProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<SignupStep>('phone');
  const [signupData, setSignupData] = useState<SignupData>(defaultSignupData);

  const setStep = (step: SignupStep) => {
    setCurrentStep(step);
  };

  const updateSignupData = (data: Partial<SignupData>) => {
    console.log('Updating signup data:', data);
    setSignupData(prev => ({
      ...prev,
      ...data
    }));
  };

  return (
    <SignupContext.Provider
      value={{
        currentStep,
        signupData,
        setStep,
        updateSignupData,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
}
