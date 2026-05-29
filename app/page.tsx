"use client";

import { AppProvider } from "@/contexts/app-context";
import { AppShell } from "@/components/hg/app-shell";

export default function Home() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
