import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json();

    // 電話番号とコードの検証
    if (!phone || !code) {
      return NextResponse.json(
        { error: '電話番号または認証コードが無効です' },
        { status: 400 }
      );
    }

    // 開発環境では固定コードを使用
    const isValidCode = process.env.NODE_ENV === 'development'
      ? code === '123456'
      : false; // 本番環境では実際の検証ロジックを実装

    if (!isValidCode) {
      return NextResponse.json(
        { error: '認証コードが正しくありません' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '認証が完了しました',
    });
  } catch (error) {
    console.error('Code verification error:', error);
    return NextResponse.json(
      { error: '認証に失敗しました' },
      { status: 500 }
    );
  }
}
