import React, { createContext, useContext, useState, ReactNode } from 'react';
import { agents, shops, assignments, salesRecords } from '../data/mockData';
import type { Agent, Shop, Assignment, SalesRecord } from '../types';

interface AppContextType {
  agents: Agent[];
  shops: Shop[];
  assignments: Assignment[];
  salesRecords: SalesRecord[];
  addSalesRecord: (record: Omit<SalesRecord, 'id'>) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  currentUser: { name: string; email: string; role: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [localSalesRecords, setLocalSalesRecords] = useState(salesRecords);

  const login = (email: string, password: string) => {
    // Demo login - accept any email/password
    if (email && password) {
      setIsAuthenticated(true);
      setCurrentUser({
        name: 'Operations Manager',
        email: email,
        role: 'Operations Manager',
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const addSalesRecord = (record: Omit<SalesRecord, 'id'>) => {
    const newRecord: SalesRecord = {
      ...record,
      id: `record${Date.now()}`,
    };
    setLocalSalesRecords(prev => [...prev, newRecord]);
  };

  return (
    <AppContext.Provider
      value={{
        agents,
        shops,
        assignments,
        salesRecords: localSalesRecords,
        addSalesRecord,
        isAuthenticated,
        login,
        logout,
        currentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
