import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Home, Flame, Youtube, LibraryIcon as Library, ChevronsLeftRight, ChevronsRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  exact?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', icon: Home, label: 'Home', exact: true },
  { href: '#', icon: Flame, label: 'Trending' }, // Placeholder
  { href: '#', icon: Youtube, label: 'Subscriptions' }, // Placeholder
  { href: '#', icon: Library, label: 'Library' }, // Placeholder
];

const Sidebar: React.FC = () => {
  console.log('Sidebar loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const navLinkClasses = (isActive: boolean) =>
    cn(
      'flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
      isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
      isCollapsed && 'justify-center'
    );

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'hidden md:fixed md:left-0 md:top-0 md:z-40 md:flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out pt-16', // pt-16 for header height
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.href}
                  end={item.exact}
                  className={({ isActive }) => navLinkClasses(isActive)}
                >
                  <item.icon className={cn('h-5 w-5', isCollapsed && 'h-6 w-6')} />
                  {!isCollapsed && <span>{item.label}</span>}
                  <span className="sr-only">{item.label}</span>
                </NavLink>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" sideOffset={5}>
                  {item.label}
                </TooltipContent>
              )}
            </Tooltip>
          ))}
        </nav>
        <div className="p-2 border-t">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size={isCollapsed ? 'icon' : 'default'}
                className={cn('w-full justify-center', !isCollapsed && 'justify-start gap-3')}
                onClick={toggleSidebar}
              >
                {isCollapsed ? <ChevronsRightLeft className="h-5 w-5" /> : <ChevronsLeftRight className="h-5 w-5" />}
                {!isCollapsed && <span>Collapse</span>}
                <span className="sr-only">{isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}</span>
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" sideOffset={5}>
                Expand Sidebar
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;