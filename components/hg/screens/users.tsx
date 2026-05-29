"use client";

import { Icon } from "@/components/hg/icons";
import { HGCard, TableShell, Btn, th, td } from "@/components/hg/ui-primitives";
import { HGAvatar } from "@/components/hg/hg-avatar";
import { USERS } from "@/lib/mock-data";

const ROLE_COLOR: Record<string, string> = {
  "Super Admin": "var(--hg-red)",
  "Administrador": "var(--hg-blue-500)",
  "Cajera": "var(--hg-green)",
};

export default function UsersScreen() {
  return (
    <div className="app-fade" style={{ padding: "24px 26px 40px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, color: "var(--hg-ink-3)", fontSize: 13.5 }}>
            Solo el <b style={{ color: "var(--hg-ink-2)" }}>Super Admin</b> puede crear, editar o desactivar cuentas. La cajera solo accede a Caja / POS.
          </p>
        </div>
        <Btn kind="primary" icon="plus">Crear usuario</Btn>
      </div>

      {/* Role cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 18 }} className="kpi-grid">
        {([
          ["Super Admin", "var(--hg-red)", "Acceso total. Gestiona usuarios, inventario y reportes.", "shield"],
          ["Administrador", "var(--hg-blue-500)", "Todo menos gestión de usuarios. Mamá, hermana, hermano.", "users"],
          ["Cajera", "var(--hg-green)", "Solo Caja / POS. Cobra y registra ventas.", "pos"],
        ] as [string, string, string, string][]).map(([r, c, desc, ic]) => (
          <HGCard key={r} pad={16}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 9 }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: `color-mix(in srgb,${c} 12%,white)`, color: c, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={ic} size={20} />
              </div>
              <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 14.5, color: "var(--hg-ink)" }}>{r}</div>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--hg-ink-3)", lineHeight: 1.45 }}>{desc}</div>
            <div style={{ marginTop: 10, fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 13, color: c }}>
              {USERS.filter(u => u.role === r).length} {USERS.filter(u => u.role === r).length === 1 ? "usuario" : "usuarios"}
            </div>
          </HGCard>
        ))}
      </div>

      <TableShell head={
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--hg-line)" }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>Todos los usuarios ({USERS.length})</h3>
        </div>
      }>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
          <thead>
            <tr>
              <th style={th}>Usuario</th>
              <th style={th}>Correo</th>
              <th style={th}>Rol</th>
              <th style={th}>Estado</th>
              <th style={th}>Actividad</th>
              <th style={{ ...th, width: 90, textAlign: "center" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map(u => (
              <tr key={u.id} className="hg-row">
                <td style={td}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <HGAvatar initials={u.initials} color={u.color} size={38} />
                    <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700 }}>{u.name}</span>
                  </div>
                </td>
                <td style={{ ...td, color: "var(--hg-ink-2)" }}>{u.email}</td>
                <td style={td}>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 11,
                    letterSpacing: ".04em", textTransform: "uppercase", padding: "4px 9px",
                    borderRadius: 7, color: ROLE_COLOR[u.role],
                    background: `color-mix(in srgb,${ROLE_COLOR[u.role]} 12%,white)`,
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={td}>
                  {u.active
                    ? <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--hg-green)", fontWeight: 700, fontSize: 12.5 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--hg-green)" }} />Activo</span>
                    : <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--hg-ink-3)", fontWeight: 700, fontSize: 12.5 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--hg-ink-3)" }} />Inactivo</span>}
                </td>
                <td style={{ ...td, color: "var(--hg-ink-3)", fontSize: 12.5 }}>{u.last}</td>
                <td style={{ ...td, textAlign: "center" }}>
                  <div style={{ display: "inline-flex", gap: 4 }}>
                    <button style={{ padding: 7, borderRadius: 8, color: "var(--hg-ink-2)", border: "1px solid var(--hg-line)", background: "none", cursor: "pointer" }}>
                      <Icon name="settings" size={16} />
                    </button>
                    <button style={{ padding: 7, borderRadius: 8, color: "var(--hg-ink-3)", border: "1px solid var(--hg-line)", background: "none", cursor: "pointer" }}>
                      <Icon name="more" size={16} />
                    </button>
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
