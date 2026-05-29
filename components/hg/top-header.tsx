"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { HGAvatar } from "./hg-avatar";
import { Role, ROLE_LABEL } from "@/lib/mock-data";

interface TopHeaderProps {
  role: Role;
  user: { name: string; initials: string; color: string; email: string };
  title: string;
  subtitle?: string;
  onRoleSwitch: (role: Role) => void;
  onLogout: () => void;
}

export function TopHeader({ role, user, title, subtitle, onRoleSwitch, onLogout }: TopHeaderProps) {
  const [menu, setMenu] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <header style={{
      height: 70, flexShrink: 0, background: "#fff", borderBottom: "1px solid var(--hg-line)",
      display: "flex", alignItems: "center", gap: 18, padding: "0 26px", zIndex: 20,
      boxShadow: "0 1px 0 rgba(8,25,63,.02)",
    }}>
      <div style={{ minWidth: 0 }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "var(--hg-ink)", letterSpacing: "-.01em" }}>{title}</h1>
        {subtitle && <div style={{ fontSize: 12.5, color: "var(--hg-ink-3)", marginTop: 2, fontWeight: 600 }}>{subtitle}</div>}
      </div>

      <div style={{ flex: 1 }} />

      {/* Search */}
      {role !== "cajera" && (
        <div className="hg-headsearch" style={{ position: "relative", width: 230 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--hg-ink-3)" }}>
            <Icon name="search" size={17} />
          </span>
          <input placeholder="Buscar producto, venta…" style={{
            width: "100%", height: 40, border: "1px solid var(--hg-line)", borderRadius: 10,
            padding: "0 12px 0 36px", fontSize: 13, color: "var(--hg-ink)", background: "var(--hg-bg)",
            fontFamily: "inherit", outline: "none",
          }} />
        </div>
      )}

      {/* Role switch */}
      <div style={{ position: "relative" }}>
        <button onClick={() => setRoleOpen(o => !o)} title="Cambiar vista de rol (demo)"
          style={{
            display: "flex", alignItems: "center", gap: 8, height: 40, padding: "0 12px",
            borderRadius: 10, border: "1px dashed var(--hg-line)", background: "#fff",
            color: "var(--hg-ink-2)", fontWeight: 700, fontSize: 12.5,
            fontFamily: "Montserrat, system-ui", cursor: "pointer",
          }}>
          <Icon name="swap" size={16} />
          <span className="hide-sm">Ver como</span>
        </button>
        {roleOpen && (
          <>
            <div onClick={() => setRoleOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
            <div className="pop" style={{
              position: "absolute", right: 0, top: 48, width: 210, background: "#fff",
              borderRadius: 13, boxShadow: "0 18px 48px rgba(8,25,63,.16)", border: "1px solid var(--hg-line)",
              padding: 7, zIndex: 50,
            }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: "var(--hg-ink-3)", padding: "6px 10px", letterSpacing: ".08em", fontFamily: "Montserrat, system-ui", textTransform: "uppercase" }}>Demo · cambiar rol</div>
              {([["super", "Super Admin", "Acceso total"], ["admin", "Administrador", "Sin gestión de usuarios"], ["cajera", "Cajera", "Solo Caja / POS"]] as [Role, string, string][]).map(([r, l, d]) => (
                <button key={r} onClick={() => { setRoleOpen(false); onRoleSwitch(r); }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%",
                    textAlign: "left", padding: "9px 10px", borderRadius: 9, cursor: "pointer",
                    background: role === r ? "var(--hg-blue-bg)" : "transparent", border: "none",
                  }}>
                  <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 13, color: "var(--hg-ink)", display: "flex", alignItems: "center", gap: 6 }}>
                    {l} {role === r && <Icon name="check" size={14} style={{ color: "var(--hg-green)" }} />}
                  </span>
                  <span style={{ fontSize: 11.5, color: "var(--hg-ink-3)" }}>{d}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bell */}
      <button style={{
        position: "relative", width: 42, height: 42, borderRadius: 11, border: "1px solid var(--hg-line)",
        background: "#fff", color: "var(--hg-ink-2)", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
      }}>
        <Icon name="bell" size={19} />
        <span style={{ position: "absolute", top: 9, right: 9, width: 8, height: 8, borderRadius: "50%", background: "var(--hg-red)", border: "2px solid #fff" }} />
      </button>

      {/* User menu */}
      <div style={{ position: "relative" }}>
        <button onClick={() => setMenu(m => !m)}
          style={{
            display: "flex", alignItems: "center", gap: 10, padding: "5px 8px 5px 6px",
            borderRadius: 12, border: "1px solid var(--hg-line)", background: "#fff", cursor: "pointer",
          }}>
          <HGAvatar initials={user.initials} color={user.color} size={36} />
          <div style={{ textAlign: "left", lineHeight: 1.15 }} className="hide-sm">
            <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 13, color: "var(--hg-ink)" }}>{user.name}</div>
            <div style={{ fontSize: 11, color: "var(--hg-ink-3)", fontWeight: 700 }}>{ROLE_LABEL[role]}</div>
          </div>
          <span className="hide-sm" style={{ color: "var(--hg-ink-3)" }}><Icon name="chevdown" size={16} /></span>
        </button>
        {menu && (
          <>
            <div onClick={() => setMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
            <div className="pop" style={{
              position: "absolute", right: 0, top: 54, width: 236, background: "#fff",
              borderRadius: 13, boxShadow: "0 18px 48px rgba(8,25,63,.16)", border: "1px solid var(--hg-line)",
              padding: 8, zIndex: 50,
            }}>
              <div style={{ display: "flex", gap: 11, alignItems: "center", padding: "8px 8px 12px", borderBottom: "1px solid var(--hg-line-2)", marginBottom: 6 }}>
                <HGAvatar initials={user.initials} color={user.color} size={42} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 13.5, color: "var(--hg-ink)" }}>{user.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--hg-ink-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</div>
                </div>
              </div>
              {([["settings", "Mi perfil"], ["shield", "Seguridad"]] as [string, string][]).map(([ic, l]) => (
                <button key={l} style={{
                  display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "9px 10px",
                  borderRadius: 9, color: "var(--hg-ink-2)", fontWeight: 600, fontSize: 13,
                  background: "transparent", border: "none", cursor: "pointer",
                }}>
                  <Icon name={ic} size={17} /> {l}
                </button>
              ))}
              <div style={{ height: 1, background: "var(--hg-line-2)", margin: "6px 0" }} />
              <button onClick={onLogout} style={{
                display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "9px 10px",
                borderRadius: 9, color: "var(--hg-red)", fontWeight: 700, fontSize: 13,
                background: "transparent", border: "none", cursor: "pointer",
              }}>
                <Icon name="logout" size={17} /> Cerrar sesión
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
