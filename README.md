# Niranjan Patil — Portfolio

Full-stack portfolio website with **Astro + React + TypeScript + TailwindCSS** frontend and **Java Spring Boot** backend.

## 🏗️ Structure

```
Portfolio/
├── frontend/          # Astro + React + TailwindCSS
│   ├── src/
│   │   ├── components/    # Astro components
│   │   ├── react/         # React interactive components
│   │   ├── layouts/       # Page layouts
│   │   ├── pages/         # Routes
│   │   └── styles/        # Global CSS
│   └── public/            # Static assets
│
└── backend/           # Java Spring Boot
    └── src/main/java/com/niranjan/portfolio/
        ├── controller/    # REST API controllers
        ├── model/         # JPA entities
        ├── repository/    # Data access
        ├── service/       # Business logic
        └── config/        # CORS, data seeder
```

## 🚀 Local Development

### Frontend

```bash
cd frontend
npm install
npm run dev          # → http://localhost:4321
```

### Backend

```bash
cd backend
mvn spring-boot:run  # → http://localhost:8080
```

## 📡 API Endpoints

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| GET    | `/api/projects`       | All projects        |
| GET    | `/api/skills`         | All skills          |
| POST   | `/api/contact`        | Submit contact form |
| GET    | `/api/contact/health` | Health check        |

## 🌐 Environment Variables

### Frontend

- `PUBLIC_API_URL` — Backend API URL (default: `http://localhost:8080`)

### Backend

- `DATABASE_URL` — PostgreSQL connection string
- `DB_USERNAME` / `DB_PASSWORD` — Database credentials
- `DB_DRIVER` — JDBC driver class
- `DB_DIALECT` — Hibernate dialect
- `MAIL_HOST` / `MAIL_PORT` / `MAIL_USERNAME` / `MAIL_PASSWORD` — Email config
- `MAIL_ENABLED` — Enable email notifications (`true`/`false`)
- `CORS_ORIGINS` — Comma-separated allowed origins
