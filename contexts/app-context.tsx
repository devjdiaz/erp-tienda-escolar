"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Role, NavSection, USER_BY_ROLE, NAV } from "@/lib/mock-data";

interface AppContextValue {
  role: Role;
  activeNav: NavSection;
  isLoggedIn: boolean;
  login: (role: Role) => void;
  logout: () => void;
  navigate: (section: NavSection) => void;
  switchRole: (role: Role) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("super");
  const [activeNav, setActiveNav] = useState<NavSection>("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((r: Role) => {
    setRole(r);
    setActiveNav(r === "cajera" ? "pos" : "dashboard");
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const navigate = useCallback((section: NavSection) => {
    const allowed = NAV.filter(n => n.roles.includes(role)).map(n => n.id);
    if (allowed.includes(section)) setActiveNav(section);
  }, [role]);

  const switchRole = useCallback((r: Role) => {
    setRole(r);
    const allowed = NAV.filter(n => n.roles.includes(r)).map(n => n.id);
    setActiveNav(prev => allowed.includes(prev) ? prev : allowed[0]);
  }, []);

  return (
    <AppContext.Provider value={{ role, activeNav, isLoggedIn, login, logout, navigate, switchRole }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export { USER_BY_ROLE };
