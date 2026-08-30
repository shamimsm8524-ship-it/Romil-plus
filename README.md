# ROMIL PLUS

Plataforma web para comercializar suscripciones, licencias y productos digitales autorizados.

**Tagline:** Tus herramientas digitales, en un solo lugar.

## Stack

- Next.js + React + TypeScript
- Tailwind CSS
- Supabase (Auth, PostgreSQL y Storage)
- Vercel para despliegue

## Primera versión incluida

- Inicio con identidad visual ROMIL+
- Catálogo y detalle de producto
- Carrito persistente en el navegador
- Checkout base
- Pantalla de login preparada para Supabase Auth
- Área `Mis compras`
- Panel administrativo inicial
- Formulario de nuevo producto
- Esquema SQL inicial de Supabase con RLS

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Luego abre `http://localhost:3000`.

## Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta `supabase/schema.sql` en el SQL Editor.
3. Copia la URL y la clave `anon` del proyecto a `.env.local`.
4. Antes de producción, completa las políticas administrativas y conecta los formularios a Supabase.

## Seguridad y negocio

Publica únicamente productos, licencias o accesos que ROMIL PLUS esté autorizado a comercializar. No almacenes contraseñas de clientes ni credenciales de terceros en texto plano. Los pagos reales deben integrarse mediante un proveedor adecuado y verificarse en servidor.

## Estado

Esta rama contiene la base funcional del MVP. El siguiente paso es conectar Supabase, autenticación real, CRUD administrativo, pedidos/pagos y despliegue en Vercel.
