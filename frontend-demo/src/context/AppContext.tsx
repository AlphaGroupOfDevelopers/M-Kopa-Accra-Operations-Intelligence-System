import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';

interface AppContextType {
  isAuthenticated: boolean;
  login: (accountNumber: string, password: string) => Promise<boolean>;
  logout: () => void;
  currentUser: { name: string; email: string; role: string } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    // Check if token exists on mount
    const token = localStorage.getItem('access_token');
    if (token) {
      // Ideally, fetch user profile here. For now, we assume authenticated.
      setIsAuthenticated(true);
      setCurrentUser({
        name: 'Operations Manager',
        email: 'admin',
        role: 'Operations Manager',
      });
    }
  }, []);

  const login = async (accountNumber: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        account_number: accountNumber,
        password: password
      });
      
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      
      setIsAuthenticated(true);
      setCurrentUser({
        name: 'Operations Manager',
        email: accountNumber,
        role: 'Operations Manager',
      });
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AppContext.Provider
      value={{
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

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
