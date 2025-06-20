import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string; // Optional: if you want to store avatar URL
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name?: string) => Promise<void>; // Simplified login
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage for a saved user session
    try {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      localStorage.removeItem('authUser');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, name: string = "Demo User") => {
    // Mock login: In a real app, this would involve an API call
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    // For demo, any email/password is fine, or you can add specific mock credentials
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name: name || email.split('@')[0], // Use part of email as name if not provided
      email: email,
      avatarUrl: 'https://ui.shadcn.com/avatars/01.png', // Default avatar
    };
    setUser(mockUser);
    localStorage.setItem('authUser', JSON.stringify(mockUser));
    setIsLoading(false);
    navigate('/'); // Navigate to homepage after login
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    navigate('/login'); // Navigate to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};