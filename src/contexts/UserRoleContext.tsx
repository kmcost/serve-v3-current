
import { createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

export type UserRole = 'admin' | 'public';

interface UserRoleContextType {
  role: UserRole;
  isAdmin: boolean;
  isPublic: boolean;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  
  // Detect role based on current route
  const role: UserRole = location.pathname.includes('/website') ? 'public' : 'admin';
  
  return (
    <UserRoleContext.Provider value={{
      role,
      isAdmin: role === 'admin',
      isPublic: role === 'public'
    }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}
