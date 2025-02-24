import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    // 電話番号の形式を検証
    if (!phone || typeof phone !== 'string') {
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
      return NextResponse.json(
        { error: 'この電話番号は既に登録されています' },
        { status: 400 }
      );
    }

    // 実際のSMS送信は省略（開発環境では固定コードを使用）
    const verificationCode = '123456';

    // 開発環境用のレスポンス
    return NextResponse.json({
      success: true,
      message: '認証コードを送信しました',
      // 開発環境でのみコードを返す
      code: process.env.NODE_ENV === 'development' ? verificationCode : undefined,
    });
  } catch (error) {
    console.error('Phone verification error:', error);
    return NextResponse.json(
      { error: '認証コードの送信に失敗しました' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
