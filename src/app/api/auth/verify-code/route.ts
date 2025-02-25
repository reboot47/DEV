import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    // 国際形式の電話番号に変換
    const formattedPhone = phone.startsWith('+') ? phone : phone.startsWith('0') ? '+81' + phone.slice(1) : '+81' + phone;

    // データベースから認証コードを取得
    const verificationData = await prisma.verificationCode.findUnique({
      where: { phone: formattedPhone }
    });

    if (!verificationData) {
      return NextResponse.json(
        { error: '認証コードが見つかりません' },
        { status: 400 }
      );
    }

    // 有効期限切れの確認
    if (verificationData.expiresAt < new Date()) {
      return NextResponse.json(
        { error: '認証コードの有効期限が切れています' },
        { status: 400 }
      );
    }

    // コードの照合
    if (verificationData.code !== code) {
      // 試行回数を更新
      await prisma.verificationCode.update({
        where: { phone: formattedPhone },
        data: {
          attempts: {
            increment: 1
          }
        }
      });

      return NextResponse.json(
        { error: '認証コードが正しくありません' },
        { status: 400 }
      );
    }

    // 認証成功を記録
    await prisma.verificationCode.update({
      where: { phone: formattedPhone },
      data: {
        verified: true
      }
    });

    return NextResponse.json({
      success: true,
      message: '認証が完了しました'
    });
  } catch (error) {
    return NextResponse.json(
      { error: '認証に失敗しました' },
      { status: 500 }
    );
  }
}
