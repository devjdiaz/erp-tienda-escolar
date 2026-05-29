"use client";

import { Icon } from "@/components/hg/icons";
import { HGCard, SectionTitle, KPICard, BarChart, Donut, ProductEmoji, Btn } from "@/components/hg/ui-primitives";
import { Q, KPIS, SALES_BY_HOUR, SALES_BY_CAT, TOP_PRODUCTS, RECENT_TX, PRODUCTS, LOW_STOCK_THRESHOLD, NavSection } from "@/lib/mock-data";

interface DashboardProps {
  onGoto?: (section: NavSection) => void;
}

export default function DashboardScreen({ onGoto }: DashboardProps) {
  const lowStock = PRODUCTS.filter(p => p.stock <= LOW_STOCK_THRESHOLD).sort((a, b) => a.stock - b.stock);

  return (
    <div className="app-fade" style={{ padding: "24px 26px 40px", maxWidth: 1320, margin: "0 auto" }}>
      {/* Greeting banner */}
      <div style={{
        marginBottom: 22, padding: "18px 22px",
        borderRadius: "var(--radius)",
        background: "linear-gradient(110deg, var(--hg-navy-900), var(--hg-navy-700) 78%, var(--hg-blue-500))",
        color: "#fff", position: "relative", overflow: "hidden",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/eagle.png" alt="" style={{ position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)", height: 130, opacity: 0.16 }} />
        <div className="dash-banner-inner" style={{ display: "flex", alignItems: "center", gap: 18, position: "relative" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, color: "var(--hg-gold)", fontWeight: 800, fontFamily: "Montserrat, system-ui", letterSpacing: ".06em" }}>
              VIERNES · 29 DE MAYO, 2026
            </div>
            <h2 style={{ margin: "4px 0 4px", fontSize: 23, fontWeight: 800 }}>Buenas tardes, Diego 🦅</h2>
            <p style={{ margin: 0, color: "rgba(255,255,255,.78)", fontSize: 14 }}>
              La tienda lleva <b style={{ color: "#fff" }}>{Q(KPIS.ventasHoy)}</b> en ventas hoy. Vas <b style={{ color: "var(--hg-gold)" }}>+14%</b> vs. ayer.
            </p>
          </div>
          <div className="dash-banner-btns" style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <Btn kind="gold" icon="pos" onClick={() => onGoto?.("pos")}>Abrir Caja</Btn>
            <Btn kind="ghost" icon="download" style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", color: "#fff" }}>Reporte</Btn>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 18 }} className="kpi-grid">
        <KPICard icon="cash" label="Ventas de hoy" value={Q(KPIS.ventasHoy)} delta={14.4} accent="var(--hg-green)" foot={`Ayer: ${Q(KPIS.ventasAyer)}`} />
        <KPICard icon="ticket" label="Transacciones" value={KPIS.transacciones} delta={11.9} accent="var(--hg-blue-500)" foot={`Ayer: ${KPIS.transAyer}`} />
        <KPICard icon="trend" label="Ticket promedio" value={Q(KPIS.ticket)} delta={2.3} accent="var(--hg-gold-600)" foot="Por venta" />
        <KPICard icon="package" label="Margen bruto" value={`${KPIS.margen}%`} delta={3.5} accent="var(--hg-navy-700)" foot="Sobre costo" />
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 16, marginBottom: 18 }} className="dash-row">
        <HGCard>
          <SectionTitle icon="reports" right={<span style={{ display: "inline-flex", alignItems: "center", fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 11, letterSpacing: ".04em", textTransform: "uppercase", padding: "4px 9px", borderRadius: 7, background: "var(--hg-bg)", color: "var(--hg-ink-3)" }}>Hoy</span>}>
            Ventas por hora
          </SectionTitle>
          <BarChart data={SALES_BY_HOUR} />
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--hg-line-2)", display: "flex", gap: 24, fontSize: 12.5, color: "var(--hg-ink-3)" }}>
            <span><b style={{ color: "var(--hg-ink)", fontFamily: "Montserrat, system-ui" }}>12:00 p.m.</b> · hora pico (recreo)</span>
            <span><b style={{ color: "var(--hg-ink)", fontFamily: "Montserrat, system-ui" }}>{Q(412)}</b> · venta máxima</span>
          </div>
        </HGCard>
        <HGCard>
          <SectionTitle icon="package">Ventas por categoría</SectionTitle>
          <Donut data={SALES_BY_CAT} />
        </HGCard>
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }} className="dash-row3">
        {/* Top products */}
        <HGCard>
          <SectionTitle icon="star">Más vendidos hoy</SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {TOP_PRODUCTS.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 4px" }}>
                <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 13, color: "var(--hg-ink-3)", width: 18 }}>{i + 1}</span>
                <ProductEmoji emoji={p.emoji} size={36} radius={10} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 13, color: "var(--hg-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--hg-ink-3)" }}>{p.units} unidades</div>
                </div>
                <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 13.5, color: "var(--hg-navy-700)" }}>{Q(p.total)}</span>
              </div>
            ))}
          </div>
        </HGCard>

        {/* Recent tx */}
        <HGCard>
          <SectionTitle icon="clock" right={
            <button onClick={() => onGoto?.("pos")} style={{ color: "var(--hg-blue-500)", fontWeight: 700, fontSize: 12.5, fontFamily: "Montserrat, system-ui", background: "none", border: "none", cursor: "pointer" }}>Ver caja</button>
          }>
            Últimas ventas
          </SectionTitle>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {RECENT_TX.slice(0, 6).map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "9px 2px", borderBottom: i < 5 ? "1px solid var(--hg-line-2)" : "none" }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--hg-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--hg-ink-3)" }}>
                  <Icon name={t.pay === "Efectivo" ? "cash" : t.pay === "Tarjeta" ? "card" : "ticket"} size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 12.5, color: "var(--hg-ink)" }}>
                    {t.id} <span style={{ color: "var(--hg-ink-3)", fontWeight: 600 }}>· {t.items} art.</span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--hg-ink-3)" }}>{t.time} · {t.pay}</div>
                </div>
                <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 13.5, color: "var(--hg-ink)" }}>{Q(t.total)}</span>
              </div>
            ))}
          </div>
        </HGCard>

        {/* Low stock */}
        <HGCard style={{ borderColor: "color-mix(in srgb, var(--hg-gold) 40%, var(--hg-line))" }}>
          <SectionTitle icon="alert" right={
            <button onClick={() => onGoto?.("inventory")} style={{ color: "var(--hg-blue-500)", fontWeight: 700, fontSize: 12.5, fontFamily: "Montserrat, system-ui", background: "none", border: "none", cursor: "pointer" }}>Inventario</button>
          }>
            Stock bajo
          </SectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {lowStock.slice(0, 5).map((p, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 11, padding: "8px 11px", borderRadius: 11,
                background: p.stock <= 4 ? "var(--hg-red-bg)" : "var(--hg-gold-bg)",
              }}>
                <ProductEmoji emoji={p.emoji} size={34} radius={9} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 12.5, color: "var(--hg-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: p.stock <= 4 ? "var(--hg-red)" : "var(--hg-gold-600)", fontWeight: 700 }}>Quedan {p.stock} · pedir más</div>
                </div>
                <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 18, color: p.stock <= 4 ? "var(--hg-red)" : "var(--hg-gold-600)" }}>{p.stock}</span>
              </div>
            ))}
          </div>
        </HGCard>
      </div>
    </div>
  );
}
