"use client";

import { CSSProperties, ReactNode } from "react";
import { Icon } from "./icons";

// ===== Card =====
export function HGCard({
  children, style = {}, pad = 20, className = "",
}: {
  children: ReactNode; style?: CSSProperties; pad?: number; className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: "var(--hg-card)", border: "1px solid var(--hg-line)",
        borderRadius: "var(--radius)", boxShadow: "0 1px 2px rgba(8,25,63,.06), 0 1px 3px rgba(8,25,63,.05)",
        padding: pad, ...style,
      }}
    >
      {children}
    </div>
  );
}

// ===== Section title =====
export function SectionTitle({
  icon, children, right,
}: {
  icon?: string; children: ReactNode; right?: ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      {icon && <span style={{ color: "var(--hg-ink-3)" }}><Icon name={icon} size={18} /></span>}
      <h3 style={{ margin: 0, fontSize: 15.5, fontWeight: 800, color: "var(--hg-ink)" }}>{children}</h3>
      <div style={{ flex: 1 }} />
      {right}
    </div>
  );
}

// ===== Delta =====
export function Delta({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const up = value >= 0;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 3, fontWeight: 800, fontSize: 12.5,
      color: up ? "var(--hg-green)" : "var(--hg-red)",
    }}>
      <Icon name={up ? "arrowup" : "arrowdown"} size={13} stroke={2.6} />
      {Math.abs(value).toFixed(1)}{suffix}
    </span>
  );
}

// ===== KPI Card =====
export function KPICard({
  icon, label, value, delta, accent = "var(--hg-blue-500)", foot,
}: {
  icon: string; label: string; value: string | number;
  delta?: number; accent?: string; foot?: string;
}) {
  return (
    <HGCard pad={18} style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: accent }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{
          width: 42, height: 42, borderRadius: 11,
          background: `color-mix(in srgb, ${accent} 12%, white)`, color: accent,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name={icon} size={21} />
        </div>
        {delta != null && <Delta value={delta} />}
      </div>
      <div style={{ fontSize: 11.5, color: "var(--hg-ink-3)", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "Montserrat, system-ui" }}>{label}</div>
      <div style={{ fontSize: 27, fontWeight: 800, color: "var(--hg-ink)", marginTop: 3, fontFamily: "Montserrat, system-ui", letterSpacing: "-.02em" }}>{value}</div>
      {foot && <div style={{ fontSize: 11.5, color: "var(--hg-ink-3)", marginTop: 6 }}>{foot}</div>}
    </HGCard>
  );
}

// ===== Bar Chart =====
export function BarChart({ data, height = 170 }: { data: { h: string; v: number }[]; height?: number }) {
  const max = Math.max(...data.map(d => d.v));
  const peak = data.findIndex(d => d.v === max);
  const Q = (n: number) => "Q" + n.toFixed(2);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "min(2.4%,14px)", height, paddingTop: 18 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, height: "100%", justifyContent: "flex-end" }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: i === peak ? "var(--hg-ink)" : "var(--hg-ink-3)", fontFamily: "Montserrat, system-ui" }}>
            {Q(d.v).replace(".00", "")}
          </div>
          <div title={Q(d.v)} style={{
            width: "78%", maxWidth: 34, height: `${(d.v / max) * 100}%`, minHeight: 6,
            borderRadius: "7px 7px 4px 4px",
            background: i === peak
              ? "linear-gradient(180deg, var(--hg-gold), var(--hg-gold-600))"
              : "linear-gradient(180deg, var(--hg-blue-400), var(--hg-blue-500))",
            boxShadow: i === peak ? "0 4px 12px rgba(252,205,17,.4)" : "none",
          }} />
          <div style={{ fontSize: 11, color: "var(--hg-ink-3)", fontWeight: 700 }}>{d.h}</div>
        </div>
      ))}
    </div>
  );
}

// ===== Donut Chart =====
export function Donut({ data, size = 150 }: { data: { cat: string; pct: number; color: string }[]; size?: number }) {
  const r = 58, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
      <svg width={size} height={size} viewBox="0 0 150 150" style={{ flexShrink: 0 }}>
        <circle cx="75" cy="75" r={r} fill="none" stroke="var(--hg-line-2)" strokeWidth="18" />
        {data.map((d, i) => {
          const len = (d.pct / 100) * c;
          const el = (
            <circle key={i} cx="75" cy="75" r={r} fill="none" stroke={d.color} strokeWidth="18"
              strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-acc} strokeLinecap="butt"
              transform="rotate(-90 75 75)" />
          );
          acc += len;
          return el;
        })}
        <text x="75" y="70" textAnchor="middle" fontFamily="Montserrat" fontWeight="800" fontSize="22" fill="var(--hg-ink)">100%</text>
        <text x="75" y="88" textAnchor="middle" fontFamily="Lato" fontSize="10.5" fill="var(--hg-ink-3)">del día</text>
      </svg>
      <div style={{ flex: 1, minWidth: 130, display: "flex", flexDirection: "column", gap: 9 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5 }}>
            <span style={{ width: 11, height: 11, borderRadius: 3, background: d.color, flexShrink: 0 }} />
            <span style={{ flex: 1, color: "var(--hg-ink-2)", fontWeight: 600 }}>{d.cat}</span>
            <span style={{ fontWeight: 800, color: "var(--hg-ink)", fontFamily: "Montserrat, system-ui" }}>{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== Status Badge =====
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, [string, string]> = {
    "Abierto": ["var(--hg-red)", "var(--hg-red-bg)"],
    "En revisión": ["var(--hg-gold-600)", "var(--hg-gold-bg)"],
    "Resuelto": ["var(--hg-green)", "var(--hg-green-bg)"],
  };
  const [c, bg] = map[status] || ["var(--hg-ink-2)", "var(--hg-bg)"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 11,
      letterSpacing: ".04em", textTransform: "uppercase", padding: "4px 9px",
      borderRadius: 7, color: c, background: bg,
    }}>
      {status}
    </span>
  );
}

// ===== Stock Pill =====
export function StockPill({ stock }: { stock: number }) {
  const LOW = 10;
  let c: string, bg: string, label: string;
  if (stock <= 4) { c = "var(--hg-red)"; bg = "var(--hg-red-bg)"; label = "Crítico"; }
  else if (stock <= LOW) { c = "var(--hg-gold-600)"; bg = "var(--hg-gold-bg)"; label = "Bajo"; }
  else { c = "var(--hg-green)"; bg = "var(--hg-green-bg)"; label = "OK"; }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <b style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, color: "var(--hg-ink)", minWidth: 24, textAlign: "right" }}>{stock}</b>
      <span style={{ display: "inline-flex", alignItems: "center", fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase" as const, padding: "4px 9px", borderRadius: 7, color: c, background: bg }}>{label}</span>
    </span>
  );
}

// ===== Product Emoji =====
export function ProductEmoji({ emoji, size = 42, radius = 12 }: { emoji: string; size?: number; radius?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, background: "var(--hg-bg)",
      border: "1px solid var(--hg-line-2)", display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: size * 0.5, flexShrink: 0,
    }}>
      {emoji}
    </div>
  );
}

// ===== Btn =====
type BtnKind = "primary" | "navy" | "gold" | "ghost" | "green";
type BtnSize = "sm" | "md" | "lg";

export function Btn({
  children, kind = "primary", icon, onClick, style = {}, size = "md", full = false,
}: {
  children: ReactNode; kind?: BtnKind; icon?: string;
  onClick?: () => void; style?: CSSProperties; size?: BtnSize; full?: boolean;
}) {
  const sizes = { sm: { h: 36, fs: 13, px: 14 }, md: { h: 44, fs: 14, px: 18 }, lg: { h: 52, fs: 15.5, px: 24 } };
  const s = sizes[size];
  const kinds: Record<BtnKind, CSSProperties> = {
    primary: { background: "var(--hg-red)", color: "#fff", border: "1px solid var(--hg-red)" },
    navy: { background: "var(--hg-navy-700)", color: "#fff", border: "1px solid var(--hg-navy-700)" },
    gold: { background: "var(--hg-gold)", color: "var(--hg-navy-900)", border: "1px solid var(--hg-gold)" },
    ghost: { background: "#fff", color: "var(--hg-ink-2)", border: "1px solid var(--hg-line)" },
    green: { background: "var(--hg-green)", color: "#fff", border: "1px solid var(--hg-green)" },
  };
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9,
        height: s.h, padding: `0 ${s.px}px`, borderRadius: 11,
        fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: s.fs,
        width: full ? "100%" : "auto", cursor: "pointer",
        ...kinds[kind], ...style,
      }}
    >
      {icon && <Icon name={icon} size={s.fs + 4} />}
      {children}
    </button>
  );
}

// ===== Table Shell =====
export function TableShell({
  children, head, foot,
}: { children: ReactNode; head?: ReactNode; foot?: ReactNode }) {
  return (
    <HGCard pad={0} style={{ overflow: "hidden" }}>
      {head}
      <div style={{ overflowX: "auto" }}>{children}</div>
      {foot}
    </HGCard>
  );
}

export const th: CSSProperties = {
  textAlign: "left", padding: "13px 18px", fontSize: 11, fontWeight: 800,
  color: "var(--hg-ink-3)", textTransform: "uppercase", letterSpacing: ".06em",
  fontFamily: "Montserrat, system-ui", whiteSpace: "nowrap",
  borderBottom: "1px solid var(--hg-line)",
};
export const td: CSSProperties = {
  padding: "13px 18px", fontSize: 13.5, color: "var(--hg-ink)",
  borderBottom: "1px solid var(--hg-line-2)", whiteSpace: "nowrap",
};
