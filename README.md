# E-commerce Clary

Aplicacion web de comercio electronico desarrollada para centralizar la venta y administracion de productos en una sola plataforma. El proyecto incluye una experiencia diferenciada para clientes y administradores, con autenticacion, catalogo de productos, carrito de compras y gestion de pedidos.

## Problematica

Los negocios que gestionan sus productos y ventas de forma manual suelen tener dificultades para mantener actualizado el catalogo, controlar el inventario, organizar los pedidos y ofrecer una experiencia de compra sencilla. Esto puede provocar errores en la informacion de los productos, perdida de tiempo en tareas administrativas y poca trazabilidad durante el proceso de compra.

## Solucion propuesta

Se desarrollo un E-commerce con una interfaz para que los clientes puedan consultar productos, agregarlos al carrito y completar sus compras mediante una pasarela de pagos, y un panel administrativo para gestionar el catalogo. La aplicacion tambien incorpora control de acceso por roles, persistencia de datos y endpoints para las operaciones principales del negocio.

## Herramientas y tecnologias

- **Frontend:** Nuxt 4, Vue 3 y Vue Router.
- **Backend:** Nuxt Server API con endpoints REST para autenticacion, productos, carrito, pedidos y carga de imagenes.
- **Base de datos:** PostgreSQL.
- **ORM y acceso a datos:** Prisma y Prisma Client.
- **Pagos:** Pasarela de pagos para procesar las compras de forma segura.
- **Autenticacion y seguridad:** JSON Web Tokens (JWT) y bcrypt para el manejo seguro de contrasenas.
- **JavaScript/TypeScript:** TypeScript para una base de codigo tipada y mantenible.
- **Entorno y herramientas:** Node.js, npm y tsx para la ejecucion de scripts de seed.

## Funcionalidades principales

- Registro, inicio y cierre de sesion.
- Autenticacion mediante cookies y JWT.
- Control de acceso para clientes y administradores.
- Consulta, creacion, edicion y eliminacion de productos.
- Carrito de compras persistente.
- Flujo de checkout y registro de pedidos.
- Integracion con pasarela de pagos para completar las transacciones.
- Carga de imagenes de productos.
- Panel administrativo para la gestion del catalogo.

## Descripcion para LinkedIn

Desarrollo de un E-commerce full stack con Nuxt 4, Vue 3, TypeScript, Prisma y PostgreSQL. Implemente autenticacion y autorizacion por roles con JWT y bcrypt, gestion de productos, carrito de compras, checkout, integracion con una pasarela de pagos y APIs REST con Nuxt Server API. El proyecto resolvio la necesidad de centralizar el catalogo, las compras y la administracion de pedidos en una plataforma web escalable y mantenible.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
