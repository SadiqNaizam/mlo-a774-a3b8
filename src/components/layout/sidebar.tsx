import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Home, Flame, Youtube, LibraryIcon as Library, ChevronsLeftRight, ChevronsRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {\n  href: string;\n  icon: React.ElementType;\n  label: string;\n  exact?: boolean;\n}\n\nconst navItems: NavItem[] = [\n  { href: '/', icon: Home, label: 'Home', exact: true },\n  { href: '#', icon: Flame, label: 'Trending' }, // Placeholder\n  { href: '#', icon: Youtube, label: 'Subscriptions' }, // Placeholder\n  { href: '#', icon: Library, label: 'Library' }, // Placeholder\n];

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggleCollapse }) => {
  console.log('Sidebar loaded, collapsed state:', isCollapsed);

  const navLinkClasses = (isActive: boolean) =>
    cn(
      'flex items-center justify-start gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
      isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground',
      isCollapsed && 'justify-center'
    );

  return (
    <TooltipProvider delayDuration={0}>\n      <aside
        className={cn(
          'hidden md:fixed md:left-0 md:top-0 md:z-40 md:flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out pt-16', // pt-16 for header height
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >\n        <nav className=\"flex-1 space-y-1 p-2\">\n          {navItems.map((item) => (\n            <Tooltip key={item.label}>\n              <TooltipTrigger asChild>\n                <NavLink
                  to={item.href}
                  end={item.exact}
                  className={({ isActive }) => navLinkClasses(isActive)}\n                >\n                  <item.icon className={cn('h-5 w-5', isCollapsed && 'h-6 w-6')} />
                  {!isCollapsed && <span>{item.label}</span>}\n                  <span className=\"sr-only\">{item.label}</span>\n                </NavLink>\n              </TooltipTrigger>\n              {isCollapsed && (\n                <TooltipContent side=\"right\" sideOffset={5}>\n                  {item.label}\n                </TooltipContent>\n              )}\n            </Tooltip>\n          ))}\n        </nav>\n        <div className=\"p-2 border-t\">\n          <Tooltip>\n            <TooltipTrigger asChild>\n              <Button
                variant=\"ghost\"
                size={isCollapsed ? 'icon' : 'default'}\n                className={cn('w-full justify-center', !isCollapsed && 'justify-start gap-3')}\n                onClick={onToggleCollapse}\n              >\n                {isCollapsed ? <ChevronsRightLeft className=\"h-5 w-5\" /> : <ChevronsLeftRight className=\"h-5 w-5\" />}\n                {!isCollapsed && <span>Collapse</span>}\n                <span className=\"sr-only\">{isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}</span>\n              </Button>\n            </TooltipTrigger>\n            {isCollapsed && (\n              <TooltipContent side=\"right\" sideOffset={5}>\n                Expand Sidebar\n              </TooltipContent>\n            )}\n          </Tooltip>\n        </div>\n      </aside>\n    </TooltipProvider>\n  );\n};\n\nexport default Sidebar;