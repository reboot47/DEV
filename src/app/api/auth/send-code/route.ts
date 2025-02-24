import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendVerificationCode } from '@/lib/twilio';

const prisma = new PrismaClient();

function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: '電話番号は必須です' },
        { status: 400 }
      );
    }

    // 電話番号のフォーマットを整える（国際形式に変換）
    let formattedPhone = phone;
    if (phone.startsWith('0')) {
      formattedPhone = '+81' + phone.slice(1);
    }
    
    console.log('Sending verification code to:', formattedPhone);

    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5分後

    try {
      await prisma.verificationCode.upsert({
        where: { phone: formattedPhone },
        update: {
          code,
          expiresAt,
          attempts: 0,
          verified: false,
        },
        create: {
          phone: formattedPhone,
          code,
          expiresAt,
        },
      });
      
      console.log('Verification code saved to database:', code);
    } catch (dbError) {
      console.error('Database error:', dbError);
      throw new Error('データベースエラーが発生しました');
    }

    try {
      await sendVerificationCode(formattedPhone, code);
      console.log('Verification code sent successfully');
    } catch (twilioError) {
      console.error('Twilio error:', twilioError);
      throw new Error('SMSの送信に失敗しました');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in send-code route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '認証コードの送信に失敗しました' },
      { status: 500 }
    );
  }
}
