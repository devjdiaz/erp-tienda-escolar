"use client";

import { useState } from "react";
import { Icon } from "@/components/hg/icons";
import { KPICard, TableShell, ProductEmoji, StockPill, Btn, th, td } from "@/components/hg/ui-primitives";
import { Q, PRODUCTS, CATEGORIES } from "@/lib/mock-data";

export default function InventoryScreen() {
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");
  const cats = ["Todos", ...CATEGORIES];
  const rows = PRODUCTS.filter(p =>
    (cat === "Todos" || p.cat === cat) &&
    (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
  );
  const totalValue = PRODUCTS.reduce((s, p) => s + p.cost * p.stock, 0);
  const lowCount = PRODUCTS.filter(p => p.stock <= 10).length;

  return (
    <div className="app-fade" style={{ padding: "24px 26px 40px", maxWidth: 1320, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 18 }} className="kpi-grid">
        <KPICard icon="box" label="Productos activos" value={PRODUCTS.length} accent="var(--hg-blue-500)" foot="6 categorías" />
        <KPICard icon="package" label="Valor inventario" value={Q(totalValue)} accent="var(--hg-navy-700)" foot="A costo" />
        <KPICard icon="alert" label="Stock bajo" value={lowCount} accent="var(--hg-gold-600)" foot="Requieren pedido" />
        <KPICard icon="trend" label="Rotación prom." value="3.2x" accent="var(--hg-green)" foot="Por semana" />
      </div>

      <TableShell head={
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", borderBottom: "1px solid var(--hg-line)", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 300 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--hg-ink-3)" }}>
              <Icon name="search" size={17} />
            </span>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar producto…"
              style={{ width: "100%", height: 40, border: "1px solid var(--hg-line)", borderRadius: 10, padding: "0 12px 0 36px", fontSize: 13, background: "var(--hg-bg)", fontFamily: "inherit", outline: "none" }} />
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", flex: 1 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                height: 36, padding: "0 13px", borderRadius: 9, fontFamily: "Montserrat, system-ui",
                fontWeight: 700, fontSize: 12.5, cursor: "pointer",
                border: cat === c ? "1px solid var(--hg-navy-700)" : "1px solid var(--hg-line)",
                background: cat === c ? "var(--hg-navy-700)" : "#fff",
                color: cat === c ? "#fff" : "var(--hg-ink-2)",
              }}>{c}</button>
            ))}
          </div>
          <Btn kind="primary" icon="plus" size="sm">Nuevo producto</Btn>
        </div>
      }>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
          <thead>
            <tr>
              <th style={th}>Producto</th>
              <th style={th}>SKU</th>
              <th style={th}>Categoría</th>
              <th style={{ ...th, textAlign: "right" }}>Costo</th>
              <th style={{ ...th, textAlign: "right" }}>Precio</th>
              <th style={{ ...th, textAlign: "right" }}>Margen</th>
              <th style={{ ...th, textAlign: "center" }}>Existencia</th>
              <th style={{ ...th, width: 40 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(p => {
              const margin = ((p.price - p.cost) / p.price * 100).toFixed(0);
              return (
                <tr key={p.id} className="hg-row">
                  <td style={td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                      <ProductEmoji emoji={p.emoji} size={36} radius={10} />
                      <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700 }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ ...td, color: "var(--hg-ink-3)", fontFamily: "monospace", fontSize: 12.5 }}>{p.sku}</td>
                  <td style={td}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 7, borderRadius: 999, padding: "6px 13px", fontWeight: 700, fontSize: 12, background: "var(--hg-bg)", color: "var(--hg-ink-2)" }}>{p.cat}</span>
                  </td>
                  <td style={{ ...td, textAlign: "right", color: "var(--hg-ink-3)" }}>{Q(p.cost)}</td>
                  <td style={{ ...td, textAlign: "right", fontFamily: "Montserrat, system-ui", fontWeight: 800 }}>{Q(p.price)}</td>
                  <td style={{ ...td, textAlign: "right", color: "var(--hg-green)", fontWeight: 700 }}>{margin}%</td>
                  <td style={{ ...td, textAlign: "center" }}><StockPill stock={p.stock} /></td>
                  <td style={{ ...td, textAlign: "center", color: "var(--hg-ink-3)" }}>
                    <button style={{ padding: 6, borderRadius: 8, color: "var(--hg-ink-3)", background: "none", border: "none", cursor: "pointer" }}>
                      <Icon name="more" size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableShell>
    </div>
  );
}
