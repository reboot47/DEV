import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, UserIcon, ChatBubbleLeftIcon, BellIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, UserIcon as UserIconSolid, 
         ChatBubbleLeftIcon as ChatIconSolid, BellIcon as BellIconSolid } from '@heroicons/react/24/solid';

export function FooterMenu() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/home',
      label: 'ホーム',
      icon: pathname === '/home' ? HomeIconSolid : HomeIcon,
    },
    {
      href: '/chat',
      label: 'チャット',
      icon: pathname === '/chat' ? ChatIconSolid : ChatBubbleLeftIcon,
    },
    {
      href: '/notifications',
      label: 'お知らせ',
      icon: pathname === '/notifications' ? BellIconSolid : BellIcon,
    },
    {
      href: '/profile',
      label: 'プロフィール',
      icon: pathname === '/profile' ? UserIconSolid : UserIcon,
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-white">
      <nav className="flex h-16 items-center justify-around">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center space-y-1 ${
                isActive ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}
