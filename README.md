# 🔐 Fullstack Auth Turborepo

This monorepo provides a modern fullstack authentication boilerplate using **Next.js** for the frontend and **NestJS** for the backend — organized and managed with **Turborepo**.

It’s designed for scalability, type safety, and developer experience — ideal as a base for full-featured auth-driven applications.

---

## 1. 📦 Getting Started

### 1. Use as Template or Clone

Use this repo as a GitHub template (recommended), or clone it directly:

- `git clone https://github.com/robertlinde/next-nest-turbo-auth-boilerplate.git`
- `cd next-nest-turbo-auth-boilerplate`

### 2. Install Dependencies

Install root-level dependencies (workspace-based):

- `pnpm install`

This will install dependencies for all apps using Turborepo's workspace management.

### 3. Setup Environment Variables

Each app has its own .env.example. Copy and configure them:

- `cp apps/nextjs-frontend/.env.example apps/nextjs-frontend/.env`
- `cp apps/nestjs-backend/.env.example apps/nestjs-backend/.env`

Then fill in the required environment variables based on your setup (e.g., database credentials, JWT secrets, email service configs).

### 4. Start the Backend

Start the database container and apply migrations:

- `cd apps/nestjs-backend`
- `docker-compose up -d`
- `pnpm run migration:create`
- `pnpm run migration:up`

### 5. Start dev mode

At the root of your project, run:

- `pnpm run dev`
- Open http://localhost:1080 to view captured emails.

Your app should now be running with both frontend and backend services in development mode.

---

## 2. ⚙️ Base Tech Used

### 🖥 Frontend (`apps/frontend`)

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS** + **PrimeReact**
- **Zustand**
- **React Hook Form** + **Joi**
- **React Query**

➡️ More in [apps/nextjs-frontend/README.md](./apps/nextjs-frontend/README.md)

### 🛠 Backend (`apps/backend`)

- **NestJS**
- **TypeScript**
- **JWT Auth**
- **MikroORM** + **PostgreSQL**
- **Templated email service**
- **class-validator**

➡️ More in [apps/nestjs-backend/README.md](./apps/nestjs-backend/README.md)

---

## 3. 🤝 Contributing

This repo is intended to be cloned, extended, and customized. Feel free to open issues or submit PRs if you're improving the base or adapting it.

---

## 4. 📝 License

MIT — free to use, modify, and distribute.

➡️ More in [LICENSE](./LICENSE)
