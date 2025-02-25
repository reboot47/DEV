import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();
    
    if (!phone) {
      return NextResponse.json({ error: '電話番号が必要です' }, { status: 400 });
    }

    // 電話番号を国際形式に変換
    const formattedPhone = phone.startsWith('0') ? '+81' + phone.slice(1) : phone;
    const nationalPhone = formattedPhone.replace('+81', '0');

    // ユーザーの重複チェック
    const existingUser = await prisma.user.findUnique({
      where: { phone: nationalPhone }
    });

    if (existingUser) {
      return NextResponse.json({ 
        success: false,
        error: 'この電話番号は既に登録されています'
      }, { status: 400 });
    }

    // 既存の認証コードの確認
    const existingVerification = await prisma.verificationCode.findUnique({
      where: { phone: formattedPhone }
    });

    // 既存の認証コードがある場合、有効期限をチェック
    if (existingVerification) {
      const now = new Date();
      if (existingVerification.expiresAt > now) {
        return NextResponse.json({ 
          success: false,
          error: '認証コードは既に送信されています。しばらく待ってから再試行してください'
        }, { status: 400 });
      }
    }

    // 認証コードを生成
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Twilioクライアントの初期化とSMS送信
    try {
      const twilioModule = await import('twilio');
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

      const client = twilioModule.default(accountSid, authToken);

      await client.messages.create({
        body: `【LINEBUZZ】認証コード: ${verificationCode}\n※このコードは5分間有効です。`,
        to: formattedPhone,
        from: twilioPhoneNumber,
      });

      // SMS送信成功後にデータベースに保存
      await prisma.verificationCode.upsert({
        where: { phone: formattedPhone },
        update: {
          code: verificationCode,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          attempts: 0,
          verified: false,
        },
        create: {
          phone: formattedPhone,
          code: verificationCode,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      });

      return NextResponse.json({ 
        success: true,
        message: '認証コードを送信しました'
      });
    } catch (twilioError) {
      throw twilioError;
    }

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
