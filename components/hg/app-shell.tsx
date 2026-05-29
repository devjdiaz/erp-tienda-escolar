"use client";

import { useApp } from "@/contexts/app-context";
import { USER_BY_ROLE, SECTION_META } from "@/lib/mock-data";
import { Sidebar } from "./sidebar";
import { TopHeader } from "./top-header";
import DashboardScreen from "@/app/(dashboard)/dashboard/page";
import POSScreen from "@/app/(dashboard)/pos/page";
import InventoryScreen from "@/app/(dashboard)/inventory/page";
import ReportsScreen from "@/app/(dashboard)/reports/page";
import LossesScreen from "@/app/(dashboard)/losses/page";
import UsersScreen from "@/app/(dashboard)/users/page";
import LoginScreen from "@/app/login/page";

export function AppShell() {
  const { role, activeNav, isLoggedIn, login, logout, navigate, switchRole } = useApp();

  if (!isLoggedIn) {
    return <LoginScreen onLogin={login} />;
  }

  const user = USER_BY_ROLE[role];
  const meta = SECTION_META[activeNav];

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Sidebar role={role} active={activeNav} onNavigate={navigate} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100%" }}>
        <TopHeader
          role={role} user={user} title={meta.title} subtitle={meta.sub}
          onRoleSwitch={switchRole} onLogout={logout}
        />
        <main style={{
          flex: 1, overflowY: activeNav === "pos" ? "hidden" : "auto",
          minHeight: 0, background: activeNav === "pos" ? "#fff" : "var(--hg-bg)",
        }}>
          {activeNav === "dashboard" && <DashboardScreen onGoto={navigate} />}
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
