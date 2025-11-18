import { FloatingDock } from '@/components/ui/floating-dock';
import { IconChartArea, IconList } from '@tabler/icons-react';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler.tsx';

export function Navbar() {
  const links = [
    {
      title: 'Список',
      icon: <IconList className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/list',
    },

    {
      title: 'Статистика',
      icon: <IconChartArea className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '/stats',
    },
    {
      title: 'Сменить тему',
      element: <AnimatedThemeToggler duration={600} className="cursor-pointer" />,
    },
  ];
  return (
    <nav className="flex items-center justify-center fixed bottom-20 w-full pointer-events-none">
      <FloatingDock desktopClassName="pointer-events-auto" mobileClassName="pointer-events-auto" items={links} />
    </nav>
  );
}
