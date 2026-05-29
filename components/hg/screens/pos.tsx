"use client";

import { useState } from "react";
import { Icon } from "@/components/hg/icons";
import { ProductEmoji } from "@/components/hg/ui-primitives";
import { Q, PRODUCTS, CATEGORIES, LOW_STOCK_THRESHOLD, Product } from "@/lib/mock-data";

interface CartItem extends Product { qty: number; }

function PaymentModal({
  total, received, setReceived, change, onClose, onFinish,
}: {
  total: number; received: string; setReceived: (v: string) => void;
  change: number; onClose: () => void; onFinish: () => void;
}) {
  const [method, setMethod] = useState("Efectivo");
  const quick = [...new Set([total, Math.ceil(total / 10) * 10, Math.ceil(total / 50) * 50, 100])];

  return (
    <div onClick={onClose} style={{
      position: "absolute", inset: 0, background: "rgba(8,25,63,.5)", backdropFilter: "blur(3px)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60, padding: 20,
    }}>
      <div className="pop" onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 440, background: "#fff", borderRadius: 22,
        boxShadow: "0 18px 48px rgba(8,25,63,.16)", overflow: "hidden",
      }}>
        <div style={{ background: "var(--hg-navy-700)", color: "#fff", padding: "22px 26px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.7)", fontWeight: 700, fontFamily: "Montserrat, system-ui", letterSpacing: ".04em" }}>TOTAL A COBRAR</div>
            <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 34 }}>{Q(total)}</div>
          </div>
          <button onClick={onClose} style={{ color: "#fff", padding: 8, borderRadius: 9, background: "rgba(255,255,255,.12)", border: "none", cursor: "pointer" }}>
            <Icon name="x" size={20} />
          </button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9, marginBottom: 20 }}>
            {([["Efectivo", "cash"], ["Tarjeta", "card"], ["Crédito", "ticket"]] as [string, string][]).map(([m, ic]) => (
              <button key={m} onClick={() => setMethod(m)} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                padding: "14px 6px", borderRadius: 14, cursor: "pointer",
                border: method === m ? "2px solid var(--hg-blue-500)" : "1px solid var(--hg-line)",
                background: method === m ? "var(--hg-blue-bg)" : "#fff",
                color: method === m ? "var(--hg-blue-500)" : "var(--hg-ink-2)",
                fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 13,
              }}>
                <Icon name={ic} size={24} /> {m}
              </button>
            ))}
          </div>

          {method === "Efectivo" && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--hg-ink-2)", fontFamily: "Montserrat, system-ui", marginBottom: 8 }}>Efectivo recibido</div>
              <input
                inputMode="decimal" value={received} onChange={e => setReceived(e.target.value)}
                placeholder="Q0.00"
                style={{
                  width: "100%", height: 54, border: "1px solid var(--hg-line)", borderRadius: 13,
                  padding: "0 16px", fontSize: 22, fontFamily: "Montserrat, system-ui", fontWeight: 800,
                  color: "var(--hg-ink)", textAlign: "right", outline: "none",
                }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                {quick.map(v => (
                  <button key={v} onClick={() => setReceived(v.toFixed(2))} style={{
                    flex: 1, height: 40, borderRadius: 10, border: "1px solid var(--hg-line)",
                    background: "var(--hg-bg)", fontFamily: "Montserrat, system-ui", fontWeight: 700,
                    fontSize: 13.5, color: "var(--hg-ink-2)", cursor: "pointer",
                  }}>
                    {Q(v).replace(".00", "")}
                  </button>
                ))}
              </div>
              {received && parseFloat(received) >= total && (
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginTop: 14, padding: "12px 16px", borderRadius: 12, background: "var(--hg-green-bg)",
                }}>
                  <span style={{ fontWeight: 700, color: "var(--hg-green)", fontFamily: "Montserrat, system-ui" }}>Cambio</span>
                  <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 22, color: "var(--hg-green)" }}>{Q(change)}</span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={onFinish}
            disabled={method === "Efectivo" && (!received || parseFloat(received) < total)}
            style={{
              width: "100%", height: 56, borderRadius: 14, fontFamily: "Montserrat, system-ui", fontWeight: 800,
              fontSize: 17, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, border: "none",
              background: (method === "Efectivo" && (!received || parseFloat(received) < total)) ? "var(--hg-line)" : "var(--hg-green)",
              color: "#fff",
              cursor: (method === "Efectivo" && (!received || parseFloat(received) < total)) ? "not-allowed" : "pointer",
            }}>
            <Icon name="check" size={23} stroke={2.6} /> Confirmar venta
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessToast({ total }: { total: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 70, pointerEvents: "none" }}>
      <div className="pop" style={{ background: "#fff", borderRadius: 22, boxShadow: "0 18px 48px rgba(8,25,63,.16)", padding: "34px 44px", textAlign: "center" }}>
        <div style={{ width: 78, height: 78, borderRadius: "50%", background: "var(--hg-green-bg)", color: "var(--hg-green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <Icon name="check" size={44} stroke={3} />
        </div>
        <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 22, color: "var(--hg-ink)" }}>¡Venta registrada!</div>
        <div style={{ fontSize: 15, color: "var(--hg-ink-3)", marginTop: 5 }}>{Q(total)} · Gracias 🦅</div>
      </div>
    </div>
  );
}

export default function POSScreen() {
  const [cart, setCart] = useState<CartItem[]>([
    { ...PRODUCTS[5], qty: 2 }, { ...PRODUCTS[0], qty: 1 },
  ]);
  const [cat, setCat] = useState("Todos");
  const [q, setQ] = useState("");
  const [pay, setPay] = useState(false);
  const [done, setDone] = useState(false);
  const [received, setReceived] = useState("");

  const cats = ["Todos", ...CATEGORIES];
  const list = PRODUCTS.filter(p =>
    (cat === "Todos" || p.cat === cat) &&
    (q === "" || p.name.toLowerCase().includes(q.toLowerCase()))
  );

  const add = (p: Product) => setCart(c => {
    const f = c.find(x => x.id === p.id);
    if (f) return c.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
    return [...c, { ...p, qty: 1 }];
  });
  const dec = (id: string) => setCart(c => c.flatMap(x => x.id === id ? (x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []) : [x]));
  const inc = (id: string) => setCart(c => c.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x));
  const remove = (id: string) => setCart(c => c.filter(x => x.id !== id));

  const subtotal = cart.reduce((s, x) => s + x.price * x.qty, 0);
  const count = cart.reduce((s, x) => s + x.qty, 0);
  const change = received ? Math.max(0, parseFloat(received || "0") - subtotal) : 0;

  function finish() {
    setPay(false); setDone(true); setReceived("");
    setTimeout(() => { setDone(false); setCart([]); }, 1700);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 392px", gap: 0, height: "100%", minHeight: 0, maxWidth: "100%" }} className="pos-grid">
      {/* Products */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: 0, padding: "22px 24px" }}>
        <div style={{ position: "relative", marginBottom: 14 }}>
          <span style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", color: "var(--hg-ink-3)" }}>
            <Icon name="search" size={20} />
          </span>
          <input
            value={q} onChange={e => setQ(e.target.value)}
            placeholder="Buscar snack, bebida, dulce… o escanear código"
            style={{
              width: "100%", height: 52, border: "1px solid var(--hg-line)", borderRadius: 14,
              padding: "0 16px 0 46px", fontSize: 15, background: "#fff",
              boxShadow: "0 1px 2px rgba(8,25,63,.06)", fontFamily: "inherit", outline: "none",
            }}
          />
          <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "var(--hg-ink-3)" }}>
            <Icon name="scan" size={22} />
          </span>
        </div>

        <div style={{ display: "flex", gap: 9, overflowX: "auto", paddingBottom: 14, flexShrink: 0 }} className="pos-cats">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              flexShrink: 0, height: 42, padding: "0 18px", borderRadius: 12,
              fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 13.5, cursor: "pointer",
              border: cat === c ? "1px solid var(--hg-navy-700)" : "1px solid var(--hg-line)",
              background: cat === c ? "var(--hg-navy-700)" : "#fff",
              color: cat === c ? "#fff" : "var(--hg-ink-2)",
            }}>
              {c}
            </button>
          ))}
        </div>

        <div style={{ overflowY: "auto", flex: 1, minHeight: 0, paddingRight: 4 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(148px,1fr))", gap: 13, paddingBottom: 8 }}>
            {list.map(p => {
              const out = p.stock <= 0;
              return (
                <button key={p.id} disabled={out} onClick={() => add(p)} style={{
                  background: "#fff", border: "1px solid var(--hg-line)", borderRadius: 16,
                  padding: "15px 13px 13px", textAlign: "left", display: "flex", flexDirection: "column",
                  gap: 10, position: "relative", opacity: out ? 0.5 : 1,
                  boxShadow: "0 1px 2px rgba(8,25,63,.06)", cursor: out ? "not-allowed" : "pointer",
                  transition: "box-shadow .15s, border-color .15s",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <ProductEmoji emoji={p.emoji} size={52} radius={14} />
                    {p.stock <= LOW_STOCK_THRESHOLD && !out && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", fontFamily: "Montserrat, system-ui",
                        fontWeight: 700, fontSize: 10, letterSpacing: ".04em", textTransform: "uppercase",
                        padding: "4px 9px", borderRadius: 7, color: "var(--hg-gold-600)", background: "var(--hg-gold-bg)",
                      }}>
                        {p.stock} izq
                      </span>
                    )}
                  </div>
                  <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 13, color: "var(--hg-ink)", lineHeight: 1.25, minHeight: 32 }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 16.5, color: "var(--hg-navy-700)" }}>{Q(p.price)}</span>
                    <span style={{ width: 30, height: 30, borderRadius: 9, background: "var(--hg-gold)", color: "var(--hg-navy-900)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="plus" size={18} stroke={2.6} />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cart */}
      <div style={{ background: "#fff", borderLeft: "1px solid var(--hg-line)", display: "flex", flexDirection: "column", minHeight: 0, boxShadow: "-6px 0 24px rgba(8,25,63,.04)" }} className="pos-cart">
        <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid var(--hg-line-2)", display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "var(--hg-navy-700)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <Icon name="pos" size={22} />
            {count > 0 && (
              <span style={{ position: "absolute", top: -6, right: -6, background: "var(--hg-red)", color: "#fff", fontSize: 11, fontWeight: 800, borderRadius: 9, minWidth: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px", border: "2px solid #fff" }}>{count}</span>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 16, color: "var(--hg-ink)" }}>Venta actual</div>
            <div style={{ fontSize: 12, color: "var(--hg-ink-3)", fontWeight: 600 }}>{count} {count === 1 ? "artículo" : "artículos"}</div>
          </div>
          {cart.length > 0 && (
            <button onClick={() => setCart([])} style={{ color: "var(--hg-ink-3)", padding: 8, borderRadius: 9, background: "none", border: "none", cursor: "pointer" }} title="Vaciar">
              <Icon name="trash" size={18} />
            </button>
          )}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px", minHeight: 0 }}>
          {cart.length === 0 ? (
            <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--hg-ink-3)", gap: 12, textAlign: "center", padding: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: 18, background: "var(--hg-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="pos" size={30} />
              </div>
              <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 14.5, color: "var(--hg-ink-2)" }}>Carrito vacío</div>
              <div style={{ fontSize: 13, maxWidth: 200, lineHeight: 1.4 }}>Toca los productos de la izquierda para agregarlos.</div>
            </div>
          ) : cart.map(it => (
            <div key={it.id} className="pop" style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px", borderRadius: 13, marginBottom: 4 }}>
              <ProductEmoji emoji={it.emoji} size={44} radius={11} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Montserrat, system-ui", fontWeight: 700, fontSize: 13, color: "var(--hg-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--hg-ink-3)", fontWeight: 700 }}>{Q(it.price)} c/u</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button onClick={() => dec(it.id)} className="qbtn"><Icon name="minus" size={16} stroke={2.6} /></button>
                <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 15, minWidth: 20, textAlign: "center" }}>{it.qty}</span>
                <button onClick={() => inc(it.id)} className="qbtn"><Icon name="plus" size={16} stroke={2.6} /></button>
              </div>
              <div style={{ width: 62, textAlign: "right", fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 14, color: "var(--hg-navy-700)" }}>{Q(it.price * it.qty)}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--hg-line-2)", padding: "16px 20px 20px", background: "var(--hg-bg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, color: "var(--hg-ink-2)", marginBottom: 7 }}>
            <span>Subtotal ({count})</span>
            <span style={{ fontWeight: 700 }}>{Q(subtotal)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 15 }}>
            <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 16, color: "var(--hg-ink)" }}>Total</span>
            <span style={{ fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 30, color: "var(--hg-navy-700)", letterSpacing: "-.02em" }}>{Q(subtotal)}</span>
          </div>
          <button disabled={cart.length === 0} onClick={() => setPay(true)} style={{
            width: "100%", height: 58, borderRadius: 15, border: "none",
            background: cart.length ? "var(--hg-red)" : "var(--hg-line)", color: "#fff",
            fontFamily: "Montserrat, system-ui", fontWeight: 800, fontSize: 18,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 11,
            boxShadow: cart.length ? "0 12px 26px rgba(188,20,26,.3)" : "none",
            cursor: cart.length ? "pointer" : "not-allowed",
          }}>
            <Icon name="cash" size={24} /> Cobrar {cart.length > 0 && Q(subtotal)}
          </button>
        </div>
      </div>

      {pay && <PaymentModal total={subtotal} received={received} setReceived={setReceived} change={change} onClose={() => setPay(false)} onFinish={finish} />}
      {done && <SuccessToast total={subtotal} />}
    </div>
  );
}
