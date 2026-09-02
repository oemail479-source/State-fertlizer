import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, RoleType } from '../types';
import { db } from '../services/db';

interface AuthContextType {
  user: User | null;
  role: RoleType;
  loginAs: (userId: string) => void;
  logout: () => void;
  demoUsers: User[];
  hasPermission: (module: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const demoUsers = db.getUsers();
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sfcl_current_user');
    return saved ? JSON.parse(saved) : demoUsers[0]; // Default Super Admin for easy evaluation
  });

  const role = user ? user.role : 'Customer/Public User';

  const loginAs = (userId: string) => {
    const selected = demoUsers.find(u => u.id === userId);
    if (selected) {
      setUser(selected);
      localStorage.setItem('sfcl_current_user', JSON.stringify(selected));
      db.addAuditLog(selected.name, selected.role, 'User Login', 'Authentication', `Logged in as ${selected.role}`);
    }
  };

  const logout = () => {
    if (user) {
      db.addAuditLog(user.name, user.role, 'User Logout', 'Authentication', 'Logged out of session');
    }
    setUser(null);
    localStorage.removeItem('sfcl_current_user');
  };

  const hasPermission = (module: string): boolean => {
    if (!user) return module === 'public';
    if (user.role === 'Super Administrator') return true;

    switch (user.role) {
      case 'Procurement Officer':
        return ['procurement', 'tenders', 'cms', 'public'].includes(module);
      case 'Booking Officer':
        return ['bungalows', 'bookings', 'refunds', 'cms', 'public'].includes(module);
      case 'Finance Officer':
        return ['payments', 'orders', 'refunds', 'reports', 'erp', 'public'].includes(module);
      case 'Content Editor':
        return ['cms', 'news', 'events', 'faq', 'vacancies', 'public'].includes(module);
      case 'Internal User':
        return ['internal_booking', 'public'].includes(module);
      case 'Website Administrator':
        return module !== 'finance_override';
      default:
        return module === 'public';
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loginAs, logout, demoUsers, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
