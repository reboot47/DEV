import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // セッションクッキーを削除
    cookies().delete('session');

    return NextResponse.json({ 
      success: true,
      message: 'ログアウトしました'
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false,
      error: 'ログアウトに失敗しました'
    }, { status: 500 });
  }
}
