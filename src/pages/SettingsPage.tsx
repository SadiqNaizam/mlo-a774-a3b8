import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { cn } from '@/lib/utils';
import { User, Palette, Bell } from 'lucide-react';

const SettingsPage: React.FC = () => {
  console.log('SettingsPage loaded');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <div className="flex flex-1">
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
        />
        <main 
          className={cn(
            "flex-1 pt-16 transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "md:pl-20" : "md:pl-64"
          )}
        >
          <ScrollArea className="h-[calc(100vh-4rem)]"> {/* 4rem = h-16 (Header height) */}
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
                Settings
              </h1>

              <div className="space-y-8">
                {/* Profile Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="mr-2 h-5 w-5 text-primary" />
                      Profile Settings
                    </CardTitle>
                    <CardDescription>Manage your personal information and account security.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="current_user_name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="user@example.com" />
                    </div>
                    <Button>Update Profile</Button>
                    <Separator />
                    <div>
                      <Label className="block mb-2">Change Password</Label>
                      <Input id="current-password" type="password" placeholder="Current Password" className="mb-2" />
                      <Input id="new-password" type="password" placeholder="New Password" className="mb-2" />
                      <Input id="confirm-password" type="password" placeholder="Confirm New Password" className="mb-2" />
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Appearance Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="mr-2 h-5 w-5 text-primary" />
                      Appearance
                    </CardTitle>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="theme-toggle">Theme</Label>
                        <p className="text-sm text-muted-foreground">Select your preferred light or dark mode.</p>
                      </div>
                      <ThemeToggleButton />
                    </div>
                    {/* Add more appearance settings here, e.g., font size, density */}
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="mr-2 h-5 w-5 text-primary" />
                      Notifications
                    </CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates and alerts via email.</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label htmlFor="push-notifications">Push Notifications</Label>
                        <p className="text-sm text-muted-foreground">Get real-time alerts in your browser or app.</p>
                      </div>
                      <Switch id="push-notifications" />
                    </div>
                     <Separator />
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label htmlFor="new-video-alerts">New Video Alerts</Label>
                        <p className="text-sm text-muted-foreground">Notify me when channels I follow upload new videos.</p>
                      </div>
                      <Switch id="new-video-alerts" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <Footer />
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;