import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  PlaySquare,
  Search,
  Upload,
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
  Home,
  Flame,
  Youtube,
  LibraryIcon,
  Video,
} from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const navItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Home', href: '/' },
    { icon: <Flame className="h-5 w-5" />, label: 'Trending', href: '#' }, // Placeholder
    { icon: <Youtube className="h-5 w-5" />, label: 'Subscriptions', href: '#' }, // Placeholder
    { icon: <LibraryIcon className="h-5 w-5" />, label: 'Library', href: '#' }, // Placeholder
    { icon: <Video className="h-5 w-5" />, label: 'Upload Video', href: '/creator-studio' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 sm:w-72">
            <SheetHeader className="mb-4">
              <SheetTitle>
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <PlaySquare className="h-7 w-7 text-primary" />
                  <span className="text-xl font-bold">StreamPlatform</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="justify-start"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to={item.href}>
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="hidden items-center gap-2 md:flex">
          <PlaySquare className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold">StreamPlatform</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl px-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Input
            type="search"
            placeholder="Search videos..."
            className="h-10 w-full rounded-full pl-10 pr-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
          <Link to="/creator-studio">
            <Upload className="h-5 w-5" />
            <span className="sr-only">Upload Video</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-4 w-4 min-w-0 justify-center rounded-full p-0.5 text-xs">3</Badge>
          <span className="sr-only">Notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="@username" />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Username</p>
                <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/channel">
                <User className="mr-2 h-4 w-4" />
                <span>My Channel</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/creator-studio">
                <Video className="mr-2 h-4 w-4" />
                <span>Creator Studio</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;