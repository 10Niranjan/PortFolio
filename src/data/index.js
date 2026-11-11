// ============================================
// PERSONAL DATA — Niranjan Patil
// ============================================

export const personal = {
  name: "Niranjan Patil",
  shortName: "Niranjan",
  initials: "NP",
  role: "Full-Stack, Mobile & GenAI Developer",
  tagline: "Building secure backends, mobile apps and agentic AI systems.",
  bio: "I'm a **full-stack, mobile & GenAI developer** based in Pune, India. I build **secure Java/Spring Boot backends, Flutter apps and LLM-powered agents,** from RAG pipelines to production APIs, with a focus on **clean code and thoughtful design.**",
  location: "Pune, India 🇮🇳",
  availability: "Open to Collaborate",
  email: "pvt.niranjan10@gmail.com",
  phone: "+91 9284774471",
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
  portfolioRepo: "https://github.com/10Niranjan/portfolio",
  // Public Web3Forms access key (safe to commit). Empty = contact form hidden, mailto links only.
  contactFormKey: "f5c7518f-74cb-4e90-b1b7-099d1c3fa6be",
  socials: {
    github: "https://github.com/10Niranjan",
    linkedin: "https://www.linkedin.com/in/niranjanpatil10",
  },
};

export const stats = [
  { value: "700+", label: "JUnit tests on ERGO Connect" },
  { value: "400+", label: "Offline pytest tests on KnowOps AI" },
  { value: "270+", label: "Automated tests on Jyoti Traders" },
  { value: "18",   label: "User roles in ERGO Connect" },
];

export const highlights = [
  "Building Campus Connect — interactive campus collaboration platform.",
  "Fanclub Cricket App — cross-platform Flutter development with real-time data.",
  "Java To-Do App — CRUD task management with JavaFX & console interface.",
  "Solving 50+ Java DSA problems on LeetCode — still counting.",
  "Google Cybersecurity Foundations — certified.",
];

export const timeline = [
  {
    type: "project",
    title: "Jyoti Traders",
    description: "Closed, invite-only B2B wholesale ordering app — Flutter, Riverpod, Firebase.",
    status: "In Progress",
  },
  {
    type: "project",
    title: "Svarae",
    description: "Premium eCommerce store — Next.js, Zustand, Prisma, CockroachDB.",
    status: "In Progress",
  },
  {
    type: "project",
    title: "Campus Connect",
    description: "Campus collaboration platform — React, Node.js, Express, MongoDB, Socket.io.",
    status: "In Progress",
  },
  {
    type: "project",
    title: "ERGO HRMS",
    description: "Enterprise HRMS for attendance, leave & payroll — Node.js, Express, PostgreSQL, React.",
    status: "In Progress",
  },
  {
    type: "project",
    title: "Fanclub Cricket App",
    description: "Cross-platform Flutter development with real-time data.",
    status: "Completed",
  },
  {
    type: "project",
    title: "Java To-Do App",
    description: "CRUD task management with JavaFX & console interface.",
    status: "Completed",
  },
  {
    type: "certification",
    title: "Google Cybersecurity Foundations",
    description: "Professional certification.",
    status: "Certified",
  },
  {
    type: "milestone",
    title: "50+ DSA Problems",
    description: "Solved on LeetCode — Java, still counting.",
    status: "Ongoing",
  },
];

export const projects = [
  {
    id: 10,
    title: "ERGO Connect",
    description: "Client B2B supply-chain platform (2-person team) connecting ERGO, its customers and suppliers across RFQ, quotation, NPD, order/production and quality workflows for 18 roles. Modular Spring Boot monolith, two-layer access control, append-only audit log, 700+ JUnit tests, OWASP ZAP and k6 verified, deployed on Oracle Cloud.",
    tags: ["Java 21", "Spring Boot 4", "React 19", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    link: null,
    github: "https://github.com/10Niranjan",
    size: "large",
  },
  {
    id: 11,
    title: "KnowOps AI",
    description: "AI support & knowledge-ops backend (2-person team) for DevOps/SRE teams: RAG answers with citations over a runbook knowledge base plus a tool-calling agent that triages tickets and escalates to a human. pgvector HNSW retrieval, JWT, rate limiting, 400+ offline pytest tests.",
    tags: ["Python", "FastAPI", "Gemini", "pgvector", "Neon Postgres", "RAG"],
    link: null,
    github: "https://github.com/10Niranjan",
    size: "large",
  },
  {
    id: 9,
    title: "ERGO HRMS",
    description: "Enterprise HRMS handling attendance, leave accrual, and deterministic payroll for 500-1000 employees — RBAC-secured admin/employee portals, auto PDF payslips & Excel payroll exports, 147+ automated tests, serverless on Vercel.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "JWT Auth", "RBAC"],
    link: "https://frontend-kappa-weld-57.vercel.app/login",
    github: "https://github.com/10Niranjan/ERGO-Employee-Management-System",
    size: "large",
  },
  {
    id: 8,
    title: "Jyoti Traders",
    description: "Closed, invite-only B2B wholesale ordering app for a local Kirana distributor and its network of verified retailers, built with Clean Architecture and a Hive-backed simulation mode for offline-first development.",
    tags: ["Flutter", "Riverpod", "Firebase", "Firestore", "Android Application", "Hive"],
    link: null,
    github: "https://github.com/10Niranjan/Jyoti-Kirana",
    size: "large",
    inDevelopment: true,
  },
  {
    id: 1,
    title: "Svarae",
    description: "Premium eCommerce store with custom glassmorphism, dynamic routing, state-managed cart drawer, and single-page checkout flow.",
    tags: ["Next.js", "Tailwind CSS", "Zustand", "Prisma", "CockroachDB", "Cloudinary"],
    link: "https://svarae-app.vercel.app",
    github: "https://github.com/10Niranjan",
    size: "large",
    inDevelopment: true,
  },
  {
    id: 2,
    title: "Campus Connect",
    description: "Interactive campus collaboration platform featuring student forums, event boards, lost-and-found listings, and peer-to-peer marketplace.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
    link: "https://campus-connect-pied-eight.vercel.app/",
    github: "https://github.com/10Niranjan",
    size: "large",
    inDevelopment: true,
  },
  {
    id: 7,
    title: "GitHub",
    description: "See more projects & open source contributions.",
    tags: [],
    link: "https://github.com/10Niranjan",
    github: "https://github.com/10Niranjan",
    size: "small",
    isGithub: true,
  },
];


// image: filename in /public (null = icon fallback in Skills.jsx); glow: hover glow colour
export const skills = [
  {
    label1: "Agentic AI",
    label2: "& RAG",
    image: null,
    alt: "Sparkles icon",
    glow: "rgba(168, 85, 247, 0.55)",
    items: ["LangGraph", "LangChain", "Multi-Agent (ReAct)", "Tool Calling", "RAG", "pgvector (HNSW)", "Gemini / OpenAI", "Pydantic", "Human-in-the-Loop"],
    color: "#a855f7",
  },
  {
    label1: "Mobile",
    label2: "development",
    image: "skill_mobile.png",
    alt: "Smartphone 3D icon",
    glow: "rgba(124, 58, 237, 0.55)",
    items: ["Flutter", "Dart", "Firebase", "Android Studio", "Provider / Riverpod"],
    color: "#7c3aed",
  },
  {
    label1: "Java &",
    label2: "Spring backend",
    image: "skill_java.png",
    alt: "Gear 3D icon",
    glow: "rgba(245, 158, 11, 0.55)",
    items: ["Java (8 · 17 · 21)", "Spring Boot 3 / 4", "Spring MVC", "Spring Data JPA", "Spring Security", "Python / FastAPI"],
    color: "#f59e0b",
  },
  {
    label1: "Web &",
    label2: "frontend",
    image: "skill_web.png",
    alt: "Cursor 3D icon",
    glow: "rgba(16, 185, 129, 0.55)",
    items: ["React.js", "TypeScript", "JavaScript", "Redux Toolkit (RTK Query)", "Material UI", "HTML5 / CSS3", "Tailwind CSS"],
    color: "#10b981",
  },
  {
    label1: "APIs &",
    label2: "messaging",
    image: "skill_api.png",
    alt: "Network 3D icon",
    glow: "rgba(236, 72, 153, 0.55)",
    items: ["REST APIs", "OpenAPI / Swagger", "Apache Kafka", "JWT / OAuth2", "Rate Limiting", "WebSockets"],
    color: "#ec4899",
  },
  {
    label1: "Databases &",
    label2: "DevOps",
    image: "skill_db.png",
    alt: "Database 3D icon",
    glow: "rgba(59, 130, 246, 0.55)",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Flyway", "Docker", "GitHub Actions CI/CD", "JUnit 5 / Pytest", "k6 · OWASP ZAP"],
    color: "#3b82f6",
  },
];
