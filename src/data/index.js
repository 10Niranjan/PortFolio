// ============================================
// PERSONAL DATA — Niranjan Patil
// ============================================

export const personal = {
  name: "Niranjan Patil",
  shortName: "Niranjan",
  initials: "NP",
  role: "Full Stack Developer & Software Engineer",
  tagline: "Designing high-fidelity interfaces and modern web solutions.",
  bio: "I'm a **full stack developer & software engineer** based in Pune, India. I develop **intuitive user interfaces and high-performance web and mobile solutions,** focusing on building high quality web experiences through **clean code and thoughtful design.**",
  location: "Pune, India 🇮🇳",
  availability: "Open to Collaborate",
  email: "pvt.niranjan10@gmail.com",
  phone: "+91 9284774471",
  resumeUrl: "/resume.pdf",
  portfolioRepo: "https://github.com/10Niranjan/portfolio",
  socials: {
    github: "https://github.com/10Niranjan",
  },
};

export const stats = [
  { value: "37",   label: "Liters of coffee consumed" },
  { value: "10+",  label: "Native APIs & State Managers Integrated" },
  { value: "50+",  label: "DSA problems solved on LeetCode" },
  { value: "2",    label: "Projects in development" },
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
    title: "Ergo",
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
    id: 9,
    title: "Ergo",
    description: "Enterprise HRMS handling attendance, leave accrual, and deterministic payroll for 500-1000 employees — RBAC-secured admin/employee portals, auto PDF payslips & Excel payroll exports, 194+ passing tests, serverless on Vercel.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "JWT Auth", "RBAC"],
    link: "https://frontend-kappa-weld-57.vercel.app/login",
    github: "https://github.com/10Niranjan/ERGO-Employee-Management-System",
    size: "large",
    inDevelopment: true,
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


export const skills = [
  {
    label1: "Mobile",
    label2: "development",
    items: ["Flutter", "Dart", "Firebase", "Android Studio", "Provider / Riverpod"],
    color: "#7c3aed",
  },
  {
    label1: "Java &",
    label2: "Spring backend",
    items: ["Java (8 · 17 · 21)", "Spring Boot 3", "Spring MVC", "Spring Data JPA", "Spring Security"],
    color: "#f59e0b",
  },
  {
    label1: "Web &",
    label2: "frontend",
    items: ["React.js", "JavaScript", "HTML5 / CSS3", "Tailwind CSS"],
    color: "#10b981",
  },
  {
    label1: "APIs &",
    label2: "messaging",
    items: ["REST APIs", "Apache Kafka", "JWT / OAuth2", "WebSockets"],
    color: "#ec4899",
  },
  {
    label1: "Databases &",
    label2: "DevOps",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Docker", "Git / GitHub", "CI/CD"],
    color: "#3b82f6",
  },
];
