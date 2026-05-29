"use client";

import { KPICard, HGCard, SectionTitle, BarChart, Donut, TableShell, ProductEmoji, Btn, th, td } from "@/components/hg/ui-primitives";
import { Q, SALES_BY_CAT, TOP_PRODUCTS } from "@/lib/mock-data";

const WEEK = [
  { h: "Lun", v: 1320 }, { h: "Mar", v: 1480 }, { h: "Mié", v: 1210 },
  { h: "Jue", v: 1610 }, { h: "Vie", v: 1842 }, { h: "Sáb", v: 640 },
];

export default function ReportsScreen() {
  return (
    <div className="app-fade" style={{ padding: "24px 26px 40px", maxWidth: 1320, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 7, background: "#fff", border: "1px solid var(--hg-line)", borderRadius: 11, padding: 4 }}>
          {["Hoy", "Semana", "Mes", "Año"].map((t, i) => (
            <button key={t} style={{
              height: 36, padding: "0 16px", borderRadius: 8, fontFamily: "Montserrat, system-ui",
              fontWeight: 700, fontSize: 13, cursor: "pointer", border: "none",
              background: i === 1 ? "var(--hg-navy-700)" : "transparent",
              color: i === 1 ? "#fff" : "var(--hg-ink-2)",
            }}>{t}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <Btn kind="ghost" icon="calendar" size="sm">23 – 29 May</Btn>
        <Btn kind="primary" icon="download" size="sm">Exportar PDF</Btn>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 18 }} className="kpi-grid">
        <KPICard icon="cash" label="Ventas semana" value={Q(8102)} delta={9.2} accent="var(--hg-green)" />
        <KPICard icon="package" label="Utilidad bruta" value={Q(3111)} delta={7.8} accent="var(--hg-navy-700)" />
        <KPICard icon="ticket" label="Transacciones" value="612" delta={5.1} accent="var(--hg-blue-500)" />
        <KPICard icon="losses" label="Pérdidas" value={Q(101)} delta={-12.0} accent="var(--hg-red)" foot="1.2% de ventas" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16, marginBottom: 18 }} className="dash-row">
        <HGCard>
          <SectionTitle icon="reports">Ventas de la semana</SectionTitle>
          <BarChart data={WEEK} height={200} />
        </HGCard>
        <HGCard>
          <SectionTitle icon="package">Mix por categoría</SectionTitle>
          <Donut data={SALES_BY_CAT} />
        </HGCard>
      </div>

      <TableShell head={
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--hg-line)" }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>Productos más rentables</h3>
        </div>
      }>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr>
              <th style={th}>Producto</th>
              <th style={{ ...th, textAlign: "right" }}>Unidades</th>
              <th style={{ ...th, textAlign: "right" }}>Ventas</th>
              <th style={{ ...th, textAlign: "right" }}>Utilidad</th>
              <th style={th}>Participación</th>
            </tr>
          </thead>
          <tbody>
            {TOP_PRODUCTS.map((p, i) => (
              <tr key={i} className="hg-row">
                <td style={td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                    <ProductEmoji emoji={p.emoji} size={34} radius={9} />
                    <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700 }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ ...td, textAlign: "right" }}>{p.units}</td>
                <td style={{ ...td, textAlign: "right", fontFamily: "Montserrat, system-ui", fontWeight: 800 }}>{Q(p.total)}</td>
                <td style={{ ...td, textAlign: "right", color: "var(--hg-green)", fontWeight: 700 }}>{Q(p.total * 0.38)}</td>
                <td style={td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <div style={{ flex: 1, height: 7, borderRadius: 4, background: "var(--hg-line-2)", maxWidth: 120 }}>
                      <div style={{ width: `${30 - i * 4}%`, height: "100%", borderRadius: 4, background: "var(--hg-gold)" }} />
                    </div>
                    <span style={{ fontSize: 12, color: "var(--hg-ink-3)", fontWeight: 700 }}>{30 - i * 4}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableShell>
    </div>
  );
}
