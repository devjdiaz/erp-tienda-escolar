"use client";

import { Icon } from "@/components/hg/icons";
import { KPICard, TableShell, StatusBadge, Btn, th, td } from "@/components/hg/ui-primitives";
import { Q, DISCREPANCIES } from "@/lib/mock-data";

export default function LossesScreen() {
  const open = DISCREPANCIES.filter(d => d.status !== "Resuelto").length;
  const totalLoss = DISCREPANCIES.filter(d => d.value < 0).reduce((s, d) => s + d.value, 0);

  return (
    <div className="app-fade" style={{ padding: "24px 26px 40px", maxWidth: 1320, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 18 }} className="kpi-grid">
        <KPICard icon="losses" label="Casos abiertos" value={open} accent="var(--hg-red)" foot="Requieren revisión" />
        <KPICard icon="cash" label="Pérdida del mes" value={Q(Math.abs(totalLoss))} delta={-12} accent="var(--hg-gold-600)" foot="1.2% de ventas" />
        <KPICard icon="package" label="Merma" value={Q(33)} accent="var(--hg-navy-700)" foot="Producto dañado/caduco" />
        <KPICard icon="check" label="Resueltos" value={DISCREPANCIES.filter(d => d.status === "Resuelto").length} accent="var(--hg-green)" foot="Este mes" />
      </div>

      <div style={{
        display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px",
        borderRadius: "var(--radius)", background: "var(--hg-red-bg)",
        border: "1px solid color-mix(in srgb, var(--hg-red) 25%, white)", marginBottom: 18,
      }}>
        <div style={{ color: "var(--hg-red)", marginTop: 1 }}><Icon name="alert" size={20} /></div>
        <div style={{ fontSize: 13.5, color: "var(--hg-ink)", lineHeight: 1.45 }}>
          <b style={{ fontFamily: "Montserrat, system-ui" }}>2 discrepancias necesitan tu atención.</b> El conteo de la tarde detectó faltantes en <b>Quesitrix</b> y <b>Pan con Pollo</b>. Revisa y registra el ajuste.
        </div>
        <div style={{ flex: 1 }} />
        <Btn kind="primary" icon="plus" size="sm">Registrar ajuste</Btn>
      </div>

      <TableShell head={
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--hg-line)", display: "flex", alignItems: "center", gap: 10 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800, flex: 1 }}>Bitácora de discrepancias</h3>
          <Btn kind="ghost" icon="filter" size="sm">Filtrar</Btn>
        </div>
      }>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 820 }}>
          <thead>
            <tr>
              <th style={th}>Folio</th>
              <th style={th}>Fecha</th>
              <th style={th}>Producto</th>
              <th style={th}>Tipo</th>
              <th style={{ ...th, textAlign: "center" }}>Esperado</th>
              <th style={{ ...th, textAlign: "center" }}>Real</th>
              <th style={{ ...th, textAlign: "center" }}>Dif.</th>
              <th style={{ ...th, textAlign: "right" }}>Valor</th>
              <th style={th}>Estado</th>
              <th style={th}>Registró</th>
            </tr>
          </thead>
          <tbody>
            {DISCREPANCIES.map(d => (
              <tr key={d.id} className="hg-row">
                <td style={{ ...td, fontFamily: "monospace", fontSize: 12.5, color: "var(--hg-ink-2)" }}>{d.id}</td>
                <td style={{ ...td, color: "var(--hg-ink-3)" }}>{d.date}</td>
                <td style={{ ...td, fontFamily: "Montserrat, system-ui", fontWeight: 700 }}>{d.product}</td>
                <td style={td}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 999, padding: "6px 13px", fontWeight: 700, fontSize: 12, background: "var(--hg-bg)", color: "var(--hg-ink-2)" }}>{d.type}</span>
                </td>
                <td style={{ ...td, textAlign: "center", color: "var(--hg-ink-3)" }}>{d.expected}</td>
                <td style={{ ...td, textAlign: "center", fontWeight: 700 }}>{d.actual}</td>
                <td style={{ ...td, textAlign: "center", fontFamily: "Montserrat, system-ui", fontWeight: 800, color: d.diff < 0 ? "var(--hg-red)" : "var(--hg-green)" }}>
                  {d.diff > 0 ? "+" : ""}{d.diff}
                </td>
                <td style={{ ...td, textAlign: "right", fontFamily: "Montserrat, system-ui", fontWeight: 800, color: d.value < 0 ? "var(--hg-red)" : "var(--hg-green)" }}>
                  {d.value < 0 ? "−" : "+"}{Q(Math.abs(d.value))}
                </td>
                <td style={td}><StatusBadge status={d.status} /></td>
                <td style={{ ...td, color: "var(--hg-ink-3)", fontSize: 12.5 }}>{d.by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableShell>
    </div>
  );
}
