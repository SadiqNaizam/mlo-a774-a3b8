import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth
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
  LogIn, // For login button
} from 'lucide-react';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';

const Header: React.FC = () => {
  console.log('Header loaded');
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Get user and logout from AuthContext
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-results?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Clear search term after navigation
    }
  };

  const handleLogout = () => {
    logout();
    // Navigation to /login is handled by AuthContext.logout
  };

  // Base navigation items for mobile menu
  const baseNavItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Home', href: '/' },
    { icon: <Flame className="h-5 w-5" />, label: 'Trending', href: '#' },
    { icon: <Youtube className="h-5 w-5" />, label: 'Subscriptions', href: '#' },
    { icon: <LibraryIcon className="h-5 w-5" />, label: 'Library', href: '#' },
  ];

  // Conditional navigation items for mobile menu based on auth state
  const userNavItems = user
    ? [
        { icon: <Video className="h-5 w-5" />, label: 'Creator Studio', href: '/creator-studio' },
        { icon: <Settings className="h-5 w-5" />, label: 'Settings', href: '/settings' },
      ]
    : [];
  
  const mobileNavItems = [...baseNavItems, ...userNavItems];


  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      <div className="flex items-center gap-2 sm:gap-4">
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
            <nav className="flex flex-col gap-1">
              {mobileNavItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="justify-start pl-3 py-2 h-auto text-base"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to={item.href} className="flex items-center w-full">
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </Link>
                </Button>
              ))}
               {!user && (
                 <Button
                    variant="ghost"
                    className="justify-start pl-3 py-2 h-auto text-base"
                    asChild
                    onClick={() => {setIsMobileMenuOpen(false); navigate('/login');}}
                  >
                   <Link to="/login" className="flex items-center w-full">
                      <LogIn className="h-5 w-5" />
                      <span className="ml-3">Login</span>
                    </Link>
                </Button>
               )}
               {user && (
                  <Button
                    variant="ghost"
                    className="justify-start pl-3 py-2 h-auto text-base text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false);}}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="ml-3">Log Out</span>
                  </Button>
               )}
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
      <div className="flex-1 max-w-md sm:max-w-lg lg:max-w-xl px-2 sm:px-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Input
            type="search"
            placeholder="Search videos..."
            className="h-10 w-full rounded-full pl-10 pr-12 border-border focus:ring-primary focus:border-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Button type="submit" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
        <ThemeToggleButton />
        {user ? (
          <>
            <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
              <Link to="/creator-studio">
                <Upload className="h-5 w-5" />
                <span className="sr-only">Upload Video</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 min-w-0 justify-center rounded-full p-0.5 text-xs">3</Badge>
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatarUrl || undefined} alt={user.name} />
                    <AvatarFallback>
                      {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-5 w-5" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/channel"> {/* Assuming this links to the user's own channel or a generic channel page */}
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
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button variant="outline" asChild>
            <Link to="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;