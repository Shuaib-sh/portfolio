import { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    description: "Core languages used across enterprise systems and modern web stacks.",
    skills: [
      { name: "C#", context: "Enterprise core, asynchronous programming, LINQ" },
      { name: "SQL", context: "Complex queries, stored procedures, indexing" },
      { name: "TypeScript", context: "Strictly typed modern web & Angular applications" },
      { name: "JavaScript", context: "Modern ES6+, DOM & web runtimes" },
    ],
  },
  {
    category: "Backend & Systems",
    description: "Server-side architectures, API design, and background execution.",
    skills: [
      { name: "ASP.NET Core Web API", context: "RESTful architecture, middleware, DI" },
      { name: ".NET Core / .NET 8", context: "Modern cross-platform runtime" },
      { name: ".NET Framework", context: "Legacy desktop client integration" },
      { name: "Dapper", context: "High-performance micro-ORM, raw SQL mapping" },
      { name: "Hangfire", context: "Distributed background job orchestration" },
      { name: "Hosted Services", context: "Background tasks, startup migration workers" },
    ],
  },
  {
    category: "Frontend & Web",
    description: "Single-page application engineering and reactive state management.",
    skills: [
      { name: "Angular 16+", context: "Component architecture, routing, modular design" },
      { name: "RxJS", context: "Observables, BehaviorSubjects, stream handling" },
      { name: "HTML5 & CSS3", context: "Semantic layout, responsive design, animations" },
      { name: "Tailwind CSS", context: "Modern utility-first responsive styling" },
    ],
  },
  {
    category: "Database Engineering",
    description: "Relational persistence, migration strategies, and query performance.",
    skills: [
      { name: "MySQL", context: "Stored procedures, table locking, enterprise ERP data" },
      { name: "SQL Server (T-SQL)", context: "Relational schema design, transactions" },
      { name: "PostgreSQL", context: "Production SaaS backing (Supabase), indexing" },
    ],
  },
  {
    category: "Auth & Security",
    description: "Stateless security, token rotation, and identity providers.",
    skills: [
      { name: "JWT (JSON Web Tokens)", context: "Short-lived access tokens, cryptographic verification" },
      { name: "Refresh Token Mechanism", context: "Secure sliding token rotation & revocation" },
      { name: "OAuth 2.0 (Google)", context: "Identity verification, third-party authentication" },
      { name: "HTTP Interceptors", context: "Automated bearer token injection & 401 retry loops" },
    ],
  },
  {
    category: "Document & Reporting Engines",
    description: "Automated document compilation, PDF generation, and invoices.",
    skills: [
      { name: "QuestPDF", context: "Modern fluent C# PDF generation" },
      { name: "FastReport", context: "Industrial enterprise report template rendering" },
      { name: "RDLC Reports", context: "Structured client reporting & data tables" },
    ],
  },
  {
    category: "Architecture & Patterns",
    description: "Maintainable system organization and industry design patterns.",
    skills: [
      { name: "Clean Architecture", context: "Separation of API, Application, Domain, Infrastructure" },
      { name: "Layered Architecture", context: "Structured enterprise service boundaries" },
      { name: "Dependency Injection", context: "Inversion of control, service lifecycles" },
      { name: "Factory Pattern", context: "Dynamic converter handler resolution" },
      { name: "Repository Pattern", context: "Decoupled persistence abstraction" },
      { name: "RESTful API Design", context: "Idempotent verbs, standard status codes & envelopes" },
    ],
  },
  {
    category: "Cloud, DevOps & Tools",
    description: "Containerization, source control, and deployment pipelines.",
    skills: [
      { name: "Docker", context: "Containerized ASP.NET Core backend runtimes" },
      { name: "Git & GitHub", context: "Version control, branching, release workflows" },
      { name: "Vercel & Render", context: "Modern frontend & containerized cloud deployment" },
      { name: "Postman", context: "API contract testing & automated verification" },
      { name: "Visual Studio & VS Code", context: "Primary IDEs & profiling tools" },
      { name: "Jira & Bitbucket", context: "Agile issue tracking and team collaboration" },
    ],
  },
];
