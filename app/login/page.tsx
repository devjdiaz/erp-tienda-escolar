"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/hg/icons";
import { HGAvatar } from "@/components/hg/hg-avatar";
import { Role } from "@/lib/mock-data";

const DEMO = [
  { role: "super" as Role, label: "Super Admin", email: "diego@hgschool.edu.gt", color: "#BC141A", initials: "DH" },
  { role: "admin" as Role, label: "Administrador", email: "maria@hgschool.edu.gt", color: "#194389", initials: "MG" },
  { role: "cajera" as Role, label: "Cajera", email: "ana.caja@hgschool.edu.gt", color: "#1E9E63", initials: "AL" },
];

const inp: React.CSSProperties = {
  width: "100%", height: 48, border: "1px solid var(--hg-line)", borderRadius: 12,
  padding: "0 14px 0 42px", fontSize: 14.5, color: "var(--hg-ink)", background: "#fff",
  fontFamily: "Lato, system-ui", outline: "none",
};

interface LoginPageProps {
  onLogin?: (role: Role) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("diego@hgschool.edu.gt");
  const [pass, setPass] = useState("howard2026");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pick, setPick] = useState<Role>("super");

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin?.(pick);
    }, 760);
  }

  return (
    <div style={{
      height: "100%", display: "flex", position: "relative", overflow: "hidden",
      background: "radial-gradient(1200px 700px at 78% 12%, #12305f 0%, var(--hg-navy-850) 42%, var(--hg-navy-900) 100%)",
    }}>
      {/* Texture */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.5,
        background: "radial-gradient(520px 520px at 14% 88%, rgba(25,67,137,.32), transparent 70%), radial-gradient(420px 420px at 92% 84%, rgba(188,20,26,.14), transparent 70%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, opacity: 0.05,
        backgroundImage: "repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 26px)",
      }} />

      {/* Left — Eagle hero */}
      <div className="login-hero" style={{
        flex: "1 1 52%", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 8%", position: "relative", zIndex: 2, minWidth: 0,
      }}>
        <div style={{ position: "relative", maxWidth: 460 }}>
          <div style={{ position: "relative", display: "inline-block", marginBottom: 26 }}>
            <div style={{
              position: "absolute", inset: "-18% -10%",
              background: "radial-gradient(circle, rgba(252,205,17,.22), transparent 68%)",
              filter: "blur(6px)",
            }} />
            <Image
              src="/eagle.png" alt="Howard Eagles"
              width={330} height={330}
              style={{ position: "relative", width: "min(330px,42vw)", height: "auto", filter: "drop-shadow(0 24px 40px rgba(0,0,0,.5))" }}
              priority
            />
          </div>
          <h1 style={{
            margin: "0 0 14px", color: "#fff",
            fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-.02em",
          }}>
            Tienda Escolar<br />
            <span style={{ color: "var(--hg-gold)" }}>Howard Gardner</span>
          </h1>
          <p style={{ margin: 0, color: "rgba(255,255,255,.72)", fontSize: 17, lineHeight: 1.5, maxWidth: 400, fontStyle: "italic" }}>
            &quot;Preparamos a tus hijos para la empresa de la vida.&quot;
          </p>
          <div style={{ display: "flex", gap: 18, marginTop: 32, color: "rgba(255,255,255,.55)", fontSize: 12.5, fontWeight: 700, fontFamily: "Montserrat, system-ui", letterSpacing: ".04em" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--hg-gold)" }} />
              SISTEMA OFICIAL
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--hg-red)" }} />
              ACCESO PRIVADO
            </span>
          </div>
        </div>
      </div>

      {/* Right — Login card */}
      <div className="login-formwrap" style={{
        flex: "1 1 48%", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "32px 6%", position: "relative", zIndex: 2,
      }}>
        <div className="pop" style={{
          width: "100%", maxWidth: 412, background: "#fff", borderRadius: 22,
          boxShadow: "0 32px 80px rgba(0,0,0,.4)", padding: "36px 34px",
        }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 11,
              letterSpacing: ".04em", textTransform: "uppercase", padding: "4px 9px",
              borderRadius: 7, color: "var(--hg-gold-600)", background: "var(--hg-gold-bg)", marginBottom: 14,
            }}>
              ● En línea
            </div>
            <h2 style={{ margin: "0 0 6px", fontSize: 25, fontWeight: 800, color: "var(--hg-ink)", letterSpacing: "-.01em" }}>
              Bienvenido de vuelta
            </h2>
            <p style={{ margin: 0, color: "var(--hg-ink-3)", fontSize: 14 }}>Ingresa con tu cuenta del sistema.</p>
          </div>

          {/* Demo chips */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: "var(--hg-ink-3)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 9, fontFamily: "Montserrat, system-ui" }}>
              Cuentas de demostración
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {DEMO.map(d => (
                <button key={d.role} onClick={() => { setPick(d.role); setEmail(d.email); setPass("howard2026"); }}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 7,
                    padding: "12px 6px", borderRadius: 13, cursor: "pointer",
                    border: pick === d.role ? "2px solid var(--hg-blue-500)" : "1px solid var(--hg-line)",
                    background: pick === d.role ? "var(--hg-blue-bg)" : "#fff",
                    transition: "all .15s",
                  }}>
                  <HGAvatar initials={d.initials} color={d.color} size={34} />
                  <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 11.5, color: "var(--hg-ink)" }}>{d.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <label style={{ display: "block" }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--hg-ink-2)", fontFamily: "Montserrat, system-ui", display: "block", marginBottom: 7 }}>
                Correo electrónico
              </span>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--hg-ink-3)" }}>
                  <Icon name="mail" size={18} />
                </span>
                <input className="ring" type="email" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
              </div>
            </label>

            <label style={{ display: "block" }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--hg-ink-2)", fontFamily: "Montserrat, system-ui", display: "block", marginBottom: 7 }}>
                Contraseña
              </span>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--hg-ink-3)" }}>
                  <Icon name="lock" size={18} />
                </span>
                <input className="ring" type={show ? "text" : "password"} value={pass}
                  onChange={e => setPass(e.target.value)}
                  style={{ ...inp, paddingRight: 44 }} />
                <button type="button" onClick={() => setShow(s => !s)}
                  style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", color: "var(--hg-ink-3)", padding: 6, background: "none", border: "none", cursor: "pointer" }}>
                  <Icon name={show ? "eyeoff" : "eye"} size={18} />
                </button>
              </div>
            </label>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 13 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--hg-ink-2)", fontWeight: 600, cursor: "pointer" }}>
                <input type="checkbox" defaultChecked style={{ width: 16, height: 16, accentColor: "var(--hg-blue-500)" }} />
                Mantener sesión
              </label>
              <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--hg-blue-500)", fontWeight: 700, textDecoration: "none" }}>
                ¿Olvidaste tu clave?
              </a>
            </div>

            <button type="submit" disabled={loading} style={{
              height: 52, borderRadius: 13,
              background: loading ? "var(--hg-red-700)" : "var(--hg-red)", color: "#fff",
              fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 16, marginTop: 4,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              boxShadow: "0 12px 26px rgba(188,20,26,.32)", border: "none", cursor: "pointer", width: "100%",
            }}>
              {loading
                ? <><span style={{ width: 18, height: 18, border: "2.5px solid rgba(255,255,255,.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin .7s linear infinite" }} /> Ingresando…</>
                : <>Ingresar <Icon name="chevright" size={18} /></>}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 22, fontSize: 12, color: "var(--hg-ink-3)", lineHeight: 1.5 }}>
            El acceso es creado por el Super Admin.<br />¿Problemas? Contacta a administración.
          </div>
        </div>
      </div>
    </div>
  );
}
