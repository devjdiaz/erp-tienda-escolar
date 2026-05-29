"use client";

import { useState } from "react";
import { useApp } from "@/contexts/app-context";
import { USER_BY_ROLE, SECTION_META, NavSection } from "@/lib/mock-data";
import { Sidebar } from "./sidebar";
import { TopHeader } from "./top-header";
import DashboardScreen from "@/components/hg/screens/dashboard";
import POSScreen from "@/components/hg/screens/pos";
import InventoryScreen from "@/components/hg/screens/inventory";
import ReportsScreen from "@/components/hg/screens/reports";
import LossesScreen from "@/components/hg/screens/losses";
import UsersScreen from "@/components/hg/screens/users";
import LoginScreen from "@/app/login/page";

export function AppShell() {
  const { role, activeNav, isLoggedIn, login, logout, navigate, switchRole } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={login} />;
  }

  const user = USER_BY_ROLE[role];
  const meta = SECTION_META[activeNav];

  function handleNavigate(section: NavSection) {
    navigate(section);
    setSidebarOpen(false); // close on mobile after navigation
  }

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden", position: "relative" }}>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(8,25,63,.55)",
            zIndex: 29, display: "none",
          }}
          className="mobile-backdrop"
        />
      )}

      <Sidebar
        role={role}
        active={activeNav}
        onNavigate={handleNavigate}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100%" }}>
        <TopHeader
          role={role} user={user} title={meta.title} subtitle={meta.sub}
          onRoleSwitch={switchRole} onLogout={logout}
          onMenuToggle={() => setSidebarOpen(o => !o)}
        />
        <main style={{
          flex: 1,
          overflowY: activeNav === "pos" ? "hidden" : "auto",
          minHeight: 0,
          background: activeNav === "pos" ? "#fff" : "var(--hg-bg)",
        }}>
          {activeNav === "dashboard" && <DashboardScreen onGoto={handleNavigate} />}
          {activeNav === "pos" && <POSScreen />}
          {activeNav === "inventory" && <InventoryScreen />}
          {activeNav === "reports" && <ReportsScreen />}
          {activeNav === "losses" && <LossesScreen />}
          {activeNav === "users" && <UsersScreen />}
        </main>
      </div>
    </div>
  );
}
