export const Q = (n: number) => "Q" + n.toFixed(2);

export const CATEGORIES = ["Bebidas", "Snacks", "Dulces", "Saludable", "Panadería", "Helados"];
export const LOW_STOCK_THRESHOLD = 10;

export interface Product {
  id: string; name: string; cat: string; price: number; cost: number;
  stock: number; sku: string; emoji: string;
}

export const PRODUCTS: Product[] = [
  { id:"p01", name:"Agua Pura Salvavidas 600ml", cat:"Bebidas", price:5.00, cost:2.80, stock:48, sku:"BEB-001", emoji:"💧" },
  { id:"p02", name:"Jugo Del Valle Durazno", cat:"Bebidas", price:7.00, cost:4.20, stock:32, sku:"BEB-002", emoji:"🧃" },
  { id:"p03", name:"Coca-Cola lata 354ml", cat:"Bebidas", price:8.00, cost:5.10, stock:60, sku:"BEB-003", emoji:"🥤" },
  { id:"p04", name:"Gatorade Azul", cat:"Bebidas", price:12.00, cost:8.00, stock:18, sku:"BEB-004", emoji:"🔵" },
  { id:"p05", name:"Doritos Nacho", cat:"Snacks", price:8.50, cost:5.50, stock:40, sku:"SNK-001", emoji:"🌽" },
  { id:"p06", name:"Tortrix Limón", cat:"Snacks", price:5.00, cost:3.00, stock:7, sku:"SNK-002", emoji:"🍋" },
  { id:"p07", name:"Ranchitas", cat:"Snacks", price:5.00, cost:3.00, stock:25, sku:"SNK-003", emoji:"🔥" },
  { id:"p08", name:"Quesitrix", cat:"Snacks", price:5.00, cost:3.10, stock:4, sku:"SNK-004", emoji:"🧀" },
  { id:"p09", name:"Galletas Chiky", cat:"Dulces", price:6.00, cost:3.80, stock:35, sku:"DUL-001", emoji:"🍪" },
  { id:"p10", name:"Chocolate Snickers", cat:"Dulces", price:10.00, cost:6.50, stock:22, sku:"DUL-002", emoji:"🍫" },
  { id:"p11", name:"Gansito Marinela", cat:"Dulces", price:7.50, cost:4.80, stock:16, sku:"DUL-003", emoji:"🐦" },
  { id:"p12", name:"Trululu Gomitas", cat:"Dulces", price:4.00, cost:2.20, stock:54, sku:"DUL-004", emoji:"🐻" },
  { id:"p13", name:"Manzana Roja", cat:"Saludable", price:4.00, cost:2.00, stock:30, sku:"SAL-001", emoji:"🍎" },
  { id:"p14", name:"Banano", cat:"Saludable", price:3.00, cost:1.20, stock:28, sku:"SAL-002", emoji:"🍌" },
  { id:"p15", name:"Barra Granola", cat:"Saludable", price:8.00, cost:5.00, stock:3, sku:"SAL-003", emoji:"🥜" },
  { id:"p16", name:"Yogurt Dos Pinos", cat:"Saludable", price:9.00, cost:6.00, stock:14, sku:"SAL-004", emoji:"🥛" },
  { id:"p17", name:"Sandwich Jamón y Queso", cat:"Panadería", price:14.00, cost:8.50, stock:12, sku:"PAN-001", emoji:"🥪" },
  { id:"p18", name:"Pan con Pollo", cat:"Panadería", price:16.00, cost:9.50, stock:9, sku:"PAN-002", emoji:"🐔" },
  { id:"p19", name:"Empanada de Piña", cat:"Panadería", price:6.00, cost:3.20, stock:20, sku:"PAN-003", emoji:"🥟" },
  { id:"p20", name:"Helado Sandwich", cat:"Helados", price:9.00, cost:5.50, stock:24, sku:"HEL-001", emoji:"🍦" },
  { id:"p21", name:"Paleta Pingüino", cat:"Helados", price:6.00, cost:3.50, stock:6, sku:"HEL-002", emoji:"🍡" },
  { id:"p22", name:"Galleta Oreo", cat:"Dulces", price:6.50, cost:4.00, stock:38, sku:"DUL-005", emoji:"⚫" },
];

export const KPIS = {
  ventasHoy: 1842.50, ventasAyer: 1610.00,
  transacciones: 132, transAyer: 118,
  ticket: 13.96, ticketAyer: 13.64,
  margen: 38.4, margenAyer: 37.1,
};

export const SALES_BY_HOUR = [
  { h:"7a", v:95 }, { h:"8a", v:142 }, { h:"9a", v:78 },
  { h:"10a", v:268 }, { h:"11a", v:184 }, { h:"12p", v:412 },
  { h:"1p", v:236 }, { h:"2p", v:198 }, { h:"3p", v:229 },
];

export const SALES_BY_CAT = [
  { cat:"Snacks", pct:31, color:"#FCCD11" },
  { cat:"Bebidas", pct:26, color:"#194389" },
  { cat:"Dulces", pct:19, color:"#BC141A" },
  { cat:"Panadería", pct:13, color:"#1E9E63" },
  { cat:"Saludable", pct:7, color:"#192D66" },
  { cat:"Helados", pct:4, color:"#9aa6bd" },
];

export const TOP_PRODUCTS = [
  { name:"Tortrix Limón", cat:"Snacks", units:64, total:320, emoji:"🍋" },
  { name:"Agua Pura 600ml", cat:"Bebidas", units:51, total:255, emoji:"💧" },
  { name:"Galletas Chiky", cat:"Dulces", units:43, total:258, emoji:"🍪" },
  { name:"Sandwich J&Q", cat:"Panadería", units:21, total:294, emoji:"🥪" },
  { name:"Coca-Cola lata", cat:"Bebidas", units:38, total:304, emoji:"🥤" },
];

export const RECENT_TX = [
  { id:"#1842", time:"14:38", items:3, total:21.00, pay:"Efectivo", by:"Ana López" },
  { id:"#1841", time:"14:35", items:1, total:8.00, pay:"Efectivo", by:"Ana López" },
  { id:"#1840", time:"14:31", items:5, total:39.50, pay:"Tarjeta", by:"Ana López" },
  { id:"#1839", time:"14:27", items:2, total:13.00, pay:"Efectivo", by:"Ana López" },
  { id:"#1838", time:"14:22", items:4, total:28.00, pay:"Crédito", by:"Ana López" },
  { id:"#1837", time:"14:18", items:1, total:5.00, pay:"Efectivo", by:"Ana López" },
];

export const DISCREPANCIES = [
  { id:"D-014", date:"29 May", product:"Quesitrix", type:"Faltante", expected:9, actual:4, diff:-5, value:-15.50, status:"Abierto", by:"Conteo PM" },
  { id:"D-013", date:"28 May", product:"Gatorade Azul", type:"Caducado", expected:20, actual:18, diff:-2, value:-24.00, status:"Resuelto", by:"M. Gardner" },
  { id:"D-012", date:"28 May", product:"Helado Sandwich", type:"Merma", expected:30, actual:24, diff:-6, value:-33.00, status:"Resuelto", by:"Conteo AM" },
  { id:"D-011", date:"27 May", product:"Pan con Pollo", type:"Faltante", expected:12, actual:9, diff:-3, value:-28.50, status:"En revisión", by:"Ana López" },
  { id:"D-010", date:"26 May", product:"Coca-Cola lata", type:"Sobrante", expected:55, actual:60, diff:5, value:25.50, status:"Resuelto", by:"Conteo AM" },
];

export const USERS = [
  { id:"u1", name:"Diego Howard", role:"Super Admin", email:"diego@hgschool.edu.gt", active:true, last:"En línea", initials:"DH", color:"#BC141A" },
  { id:"u2", name:"María Gardner", role:"Administrador", email:"maria@hgschool.edu.gt", active:true, last:"Hace 2 h", initials:"MG", color:"#194389" },
  { id:"u3", name:"Lucía Howard", role:"Administrador", email:"lucia@hgschool.edu.gt", active:true, last:"Ayer", initials:"LH", color:"#192D66" },
  { id:"u4", name:"Ana López", role:"Cajera", email:"ana.caja@hgschool.edu.gt", active:true, last:"En línea", initials:"AL", color:"#1E9E63" },
  { id:"u5", name:"Sofía Marroquín", role:"Cajera", email:"sofia.caja@hgschool.edu.gt", active:false, last:"Hace 8 días", initials:"SM", color:"#9aa6bd" },
];

export type Role = "super" | "admin" | "cajera";

export const USER_BY_ROLE: Record<Role, { name: string; initials: string; color: string; email: string }> = {
  super:  { name:"Diego Howard", initials:"DH", color:"#BC141A", email:"diego@hgschool.edu.gt" },
  admin:  { name:"María Gardner", initials:"MG", color:"#194389", email:"maria@hgschool.edu.gt" },
  cajera: { name:"Ana López", initials:"AL", color:"#1E9E63", email:"ana.caja@hgschool.edu.gt" },
};

export const ROLE_LABEL: Record<Role, string> = {
  super: "Super Admin",
  admin: "Administrador",
  cajera: "Cajera",
};

export type NavSection = "dashboard" | "pos" | "inventory" | "reports" | "losses" | "users";

export const NAV: { id: NavSection; label: string; icon: string; roles: Role[] }[] = [
  { id:"dashboard", label:"Dashboard", icon:"dashboard", roles:["super","admin"] },
  { id:"pos", label:"Caja / POS", icon:"pos", roles:["super","admin","cajera"] },
  { id:"inventory", label:"Inventario", icon:"inventory", roles:["super","admin"] },
  { id:"reports", label:"Reportes", icon:"reports", roles:["super","admin"] },
  { id:"losses", label:"Pérdidas y Discrepancias", icon:"losses", roles:["super","admin"] },
  { id:"users", label:"Usuarios", icon:"users", roles:["super"] },
];

export const SECTION_META: Record<NavSection, { title: string; sub: string }> = {
  dashboard: { title:"Dashboard", sub:"Resumen del día · Tienda Escolar HG" },
  pos:       { title:"Caja / POS", sub:"Cobro rápido de productos" },
  inventory: { title:"Inventario", sub:"Productos, existencias y costos" },
  reports:   { title:"Reportes", sub:"Ventas, utilidad y tendencias" },
  losses:    { title:"Pérdidas y Discrepancias", sub:"Control de faltantes y mermas" },
  users:     { title:"Usuarios", sub:"Gestión de cuentas y permisos" },
};
