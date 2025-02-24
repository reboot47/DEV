import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Login attempt:', { phone: data.phone });

    const { phone, password } = data;

    if (!phone || !password) {
      return NextResponse.json(
        { error: '電話番号とパスワードを入力してください' },
        { status: 400 }
      );
    }

    // ユーザーを検索
    const user = await prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      console.log('User not found:', phone);
      return NextResponse.json(
        { error: '電話番号またはパスワードが正しくありません' },
        { status: 401 }
      );
    }

    // パスワードの検証
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      console.log('Invalid password for user:', phone);
      return NextResponse.json(
        { error: '電話番号またはパスワードが正しくありません' },
        { status: 401 }
      );
    }

    // セッションクッキーを設定
    const cookieStore = cookies();
    cookieStore.set('userId', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1週間
    });

    console.log('Login successful:', { userId: user.id, phone: user.phone });

    // パスワードを除外してユーザー情報を返す
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'ログイン処理でエラーが発生しました' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
