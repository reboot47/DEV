import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import twilio, { Twilio } from 'twilio';

const prisma = new PrismaClient();

// Twilioクライアントの初期化を try-catch で囲む
let twilioClient: Twilio | undefined;
try {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  console.log('Twilio client initialized successfully');
} catch (error) {
  console.error('Twilio client initialization error:', error);
}

// 6桁のランダムな認証コードを生成
function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    // リクエストボディのパース
    const body = await request.json();
    console.log('Received request body:', body);
    const { phone } = body;

    // 環境変数の確認
    console.log('Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ? 'Set' : 'Not set',
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN ? 'Set' : 'Not set',
      TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    });

    // 電話番号の形式を検証
    if (!phone || typeof phone !== 'string') {
      console.error('Invalid phone number format:', phone);
      return NextResponse.json(
        { error: '電話番号が無効です' },
        { status: 400 }
      );
    }

    // 電話番号が既に登録されているか確認
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser) {
      console.log('Phone number already registered:', phone);
      return NextResponse.json(
        { error: 'この電話番号は既に登録されています' },
        { status: 400 }
      );
    }

    // 認証コードを生成
    const verificationCode = process.env.NODE_ENV === 'development' 
      ? '123456' 
      : generateVerificationCode();
    console.log('Generated verification code:', verificationCode);

    // 本番環境でのSMS送信
    if (process.env.NODE_ENV === 'production') {
      if (!twilioClient) {
        console.error('Twilio client not initialized');
        return NextResponse.json(
          { error: 'SMS送信サービスが初期化されていません' },
          { status: 500 }
        );
      }

      try {
        const formattedPhone = phone.startsWith('+') ? phone : `+81${phone.slice(1)}`;
        console.log('Attempting to send SMS to:', formattedPhone);

        // Twilioを使用してSMSを送信
        const message = await twilioClient.messages.create({
          body: `【LINEBUZZ】認証コード: ${verificationCode}\nこのコードは10分間有効です。`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: formattedPhone,
        });

        console.log('SMS sent successfully:', message.sid);
      } catch (twilioError) {
        console.error('Twilio SMS sending error:', twilioError);
        return NextResponse.json(
          { 
            error: 'SMSの送信に失敗しました',
            details: twilioError.message 
          },
          { status: 500 }
        );
      }
    } else {
      console.log('Development mode - skipping SMS send');
    }

    // 認証コードをキャッシュまたはデータベースに保存する処理をここに追加

    return NextResponse.json({
      success: true,
      message: '認証コードを送信しました',
      // 開発環境でのみコードを返す
      code: process.env.NODE_ENV === 'development' ? verificationCode : undefined,
    });
  } catch (error) {
    console.error('Phone verification error:', error);
    return NextResponse.json(
      { 
        error: '認証コードの送信に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
