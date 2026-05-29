"use client";

import Image from "next/image";
import { Icon } from "./icons";
import { NAV, Role, NavSection } from "@/lib/mock-data";

interface SidebarProps {
  role: Role;
  active: NavSection;
  onNavigate: (section: NavSection) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ role, active, onNavigate, mobileOpen = false, onMobileClose }: SidebarProps) {
  const items = NAV.filter(n => n.roles.includes(role));
  const cajeraOnly = role === "cajera";

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(8,25,63,.55)",
            zIndex: 29,
          }}
          className="sidebar-backdrop"
        />
      )}

      <aside
        className={mobileOpen ? "hg-sidebar hg-sidebar--open" : "hg-sidebar"}
        style={{
          width: 266, flexShrink: 0, height: "100%",
          background: "linear-gradient(180deg, var(--hg-navy-900) 0%, var(--hg-navy-850) 55%, var(--hg-navy-700) 140%)",
          color: "#fff", display: "flex", flexDirection: "column",
          position: "relative", boxShadow: "2px 0 24px rgba(8,25,63,.18)", zIndex: 30,
        }}
      >
        {/* Brand */}
        <div style={{
          padding: "20px 18px 16px", display: "flex", alignItems: "center", gap: 12,
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}>
          {/* Close button (mobile only) */}
          <button
            onClick={onMobileClose}
            className="sidebar-close-btn"
            style={{
              display: "none", position: "absolute", top: 14, right: 14,
              color: "rgba(255,255,255,.7)", background: "rgba(255,255,255,.1)",
              border: "none", borderRadius: 9, padding: 8, cursor: "pointer",
            }}
          >
            <Icon name="x" size={18} />
          </button>

          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Image src="/eagle.png" alt="HG" width={34} height={34}
              style={{ objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,.35))" }} />
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 15.5, letterSpacing: ".01em" }}>
              Tienda Escolar
            </div>
            <div style={{ fontSize: 11, color: "var(--hg-gold)", fontWeight: 700, fontFamily: "Montserrat, system-ui", letterSpacing: ".08em", textTransform: "uppercase" }}>
              Howard Gardner
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "14px 12px", overflowY: "auto" }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: ".14em", color: "rgba(255,255,255,.4)", padding: "4px 12px 10px", fontFamily: "Montserrat, system-ui", textTransform: "uppercase" }}>
            {cajeraOnly ? "Punto de venta" : "Menú principal"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {items.map(it => {
              const isActive = active === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => onNavigate(it.id)}
                  className={"nav-item" + (isActive ? " is-active" : "")}
                  style={{
                    display: "flex", alignItems: "center", gap: 13, width: "100%",
                    padding: "12px 13px", borderRadius: 11, textAlign: "left",
                    fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 13.5,
                    position: "relative", border: "none", cursor: "pointer",
                  }}
                >
                  <Icon name={it.icon} size={20} stroke={isActive ? 2.4 : 2} />
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {it.id === "losses" && !isActive && (
                    <span style={{
                      background: "var(--hg-red)", color: "#fff", fontSize: 10.5,
                      fontWeight: 800, borderRadius: 8, minWidth: 19, height: 19,
                      display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px",
                    }}>2</span>
                  )}
                </button>
              );
            })}
          </div>

          {cajeraOnly && (
            <div style={{
              margin: "18px 8px 0", padding: 14, borderRadius: 13,
              background: "rgba(252,205,17,.1)", border: "1px solid rgba(252,205,17,.28)",
            }}>
              <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                <div style={{ color: "var(--hg-gold)", marginTop: 1 }}><Icon name="scan" size={18} /></div>
                <div style={{ fontSize: 12, lineHeight: 1.4, color: "rgba(255,255,255,.85)" }}>
                  <b style={{ fontFamily: "Montserrat, system-ui", color: "#fff" }}>Modo Caja.</b>{" "}
                  Cobra rápido tocando los productos.
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Footer */}
        <div style={{
          padding: "14px 18px", borderTop: "1px solid rgba(255,255,255,.08)",
          display: "flex", alignItems: "center", gap: 10, fontSize: 11.5, color: "rgba(255,255,255,.5)",
        }}>
          <Icon name="shield" size={16} />
          <span>Sistema seguro · v1.0</span>
        </div>
      </aside>
    </>
  );
}
