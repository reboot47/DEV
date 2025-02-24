import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Registration data received:', {
      phone: data.phone,
      name: data.name,
      gender: data.gender,
      birthDate: data.birthDate,
      hasPassword: !!data.password,
      hasProfileImage: !!data.profileImage
    });

    const { phone, password, name, gender, birthDate, profileImage } = data;

    // 必須フィールドの検証
    if (!phone || !password || !name || !gender || !birthDate) {
      console.error('Missing required fields:', { 
        hasPhone: !!phone,
        hasPassword: !!password,
        hasName: !!name,
        hasGender: !!gender,
        hasBirthDate: !!birthDate
      });
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // birthDateの形式を確認
    const parsedBirthDate = new Date(birthDate);
    if (isNaN(parsedBirthDate.getTime())) {
      console.error('Invalid birth date format:', birthDate);
      return NextResponse.json(
        { error: '生年月日の形式が正しくありません' },
        { status: 400 }
      );
    }

    try {
      // 既存のユーザーをチェック
      const existingUser = await prisma.user.findUnique({
        where: { phone }
      });

      if (existingUser) {
        console.error('Phone number already registered:', phone);
        return NextResponse.json(
          { error: 'この電話番号は既に登録されています' },
          { status: 400 }
        );
      }

      // パスワードのハッシュ化
      const hashedPassword = await bcrypt.hash(password, 10);
      
      console.log('Attempting to create user with data:', {
        phone,
        name,
        gender,
        birthDate: parsedBirthDate,
        hasProfileImage: !!profileImage
      });

      // ユーザーの作成
      const user = await prisma.user.create({
        data: {
          phone,
          password: hashedPassword,
          name,
          gender,
          birthDate: parsedBirthDate,
          profileImage: profileImage || null,
        },
      });

      console.log('User created successfully:', {
        userId: user.id,
        phone: user.phone,
        name: user.name
      });

      return NextResponse.json({ 
        success: true,
        userId: user.id 
      });

    } catch (dbError) {
      console.error('Database operation details:', {
        error: dbError,
        code: dbError instanceof Prisma.PrismaClientKnownRequestError ? dbError.code : 'unknown',
        meta: dbError instanceof Prisma.PrismaClientKnownRequestError ? dbError.meta : null,
      });

      if (dbError instanceof Prisma.PrismaClientKnownRequestError) {
        // 一意性制約違反
        if (dbError.code === 'P2002') {
          return NextResponse.json(
            { error: 'この電話番号は既に登録されています' },
            { status: 400 }
          );
        }
        // その他のPrismaエラー
        return NextResponse.json(
          { error: `データベースエラー: ${dbError.code}` },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: 'データベースエラーが発生しました' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected registration error:', error);
    return NextResponse.json(
      { error: '登録処理でエラーが発生しました' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
