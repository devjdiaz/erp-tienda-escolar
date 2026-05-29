# DESARROLLO.md — ERP Tienda Escolar

Reglas inamovibles y checklist del MVP. Leer antes de tocar código.

---

## Reglas de Desarrollo

1. **Un paso a la vez** — no avanzar al siguiente paso sin aprobación explícita del owner
2. **Diseño antes de código** — cada módulo requiere diseño aprobado en claude.ai/design
3. **Visual primero** — implementar UI shells con mock data antes de conectar lógica real
4. **Una branch por feature** — siempre `git checkout -b feature/<nombre-issue>`
5. **GitHub Issues como checklist** — cerrar issue = completado y aprobado por el owner
6. Sin excepciones salvo autorización explícita

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Base de datos | PostgreSQL vía Neon |
| ORM | Prisma |
| Auth | NextAuth.js v5 |
| UI | Shadcn UI + Tailwind CSS |
| Deploy | Vercel |

---

## Roles

| Rol | Acceso |
|-----|--------|
| `SUPER_ADMIN` | Todo: usuarios, inventario, POS, reportes, detección pérdidas, configuración |
| `ADMIN` | Inventario, reportes, detección pérdidas — sin gestión de usuarios |
| `CAJERA` | Solo POS: registrar ventas, ver productos, cuadre diario |

---

## Checklist MVP

### Fase 0 — Fundación
- [x] Crear repo en GitHub → https://github.com/devjdiaz/erp-tienda-escolar
- [x] Crear todos los GitHub Issues del MVP (#1 al #24)
- [x] Crear este DESARROLLO.md (#1)

### Fase 1 — Diseño Visual *(en claude.ai/design)*
- [ ] #2 — Login + Layout + Sidebar
- [ ] #3 — Dashboard principal
- [ ] #4 — POS / Caja registradora
- [ ] #5 — Módulo Inventario
- [ ] #6 — Reportes y Rentabilidad
- [ ] #7 — Detección de Pérdidas
- [ ] #8 — Gestión de Usuarios (Super Admin)

### Fase 2 — Setup Técnico
- [ ] #9 — create-next-app + dependencias
- [ ] #10 — Schema Prisma + migraciones + seed
- [ ] #11 — Deploy base en Vercel + Neon PostgreSQL

### Fase 3 — UI Shells *(visual sin lógica real)*
- [ ] #12 — Layout + Sidebar + navegación por rol
- [ ] #13 — Login UI
- [ ] #14 — Dashboard con datos mock
- [ ] #15 — POS con productos mock
- [ ] #16 — Inventario mock
- [ ] #17 — Reportes mock

### Fase 4 — Funcionalidad Real
- [ ] #18 — Auth real (NextAuth + roles + middleware)
- [ ] #19 — CRUD Productos + Inventario real
- [ ] #20 — POS funcional (venta real + descuento stock)
- [ ] #21 — Cierre de caja
- [ ] #22 — Reportes con datos reales
- [ ] #23 — Detección de pérdidas
- [ ] #24 — Gestión de usuarios (Super Admin)

---

## Convención de Branches

```
feature/layout
feature/auth-ui
feature/dashboard-ui
feature/pos-ui
feature/inventory-ui
feature/reports-ui
feature/auth
feature/inventory
feature/pos
feature/cash-closing
feature/reports
feature/losses
feature/users
setup/proyecto-base
setup/database
setup/deploy
```

---

## Tipos de Productos

| Tipo | Ejemplo | Stock | Costo |
|------|---------|-------|-------|
| `PACKAGED` | Doritos, Coca-Cola, dulces | Controlado por unidad | Precio de compra por unidad |
| `PREPARED_RESOLD` | Pizza por porción (Domino's) | Controlado por porción | Precio de compra por porción |
| `PREPARED_MADE` | Nachos con carne | No controlado por ingrediente | Costo estimado manual |
