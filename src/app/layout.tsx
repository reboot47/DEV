import { Noto_Sans_JP, Zen_Kaku_Gothic_New } from 'next/font/google';
import '../styles/globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-zen-kaku-gothic-new',
});

export const metadata = {
  title: 'LINEBUZZ',
  description: 'モダンなコミュニケーションプラットフォーム',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${zenKakuGothicNew.variable}`}>
      <body>{children}</body>
    </html>
  );
}
