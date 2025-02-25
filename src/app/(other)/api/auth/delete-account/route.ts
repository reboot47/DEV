import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { cookies } from 'next/headers';
import { getSession } from '../../../lib/session';

export async function DELETE() {
  try {
    const session = await getSession();
    
    if (!session?.user?.id) {
      return NextResponse.json({ 
        success: false,
        error: '認証が必要です'
      }, { status: 401 });
    }

    // 関連する認証コードを削除
    await prisma.verificationCode.deleteMany({
      where: { phone: session.user.phone }
    });

    // ユーザーを削除
    await prisma.user.delete({
      where: { id: session.user.id }
    });

    // セッションクッキーを削除
    cookies().delete('session');

    return NextResponse.json({ 
      success: true,
      message: 'アカウントが削除されました'
    });

  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'アカウントの削除中にエラーが発生しました'
    }, { status: 500 });
  }
}
