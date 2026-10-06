import { CareerRole } from "@/types";

export const careerData: CareerRole = {
  company: "Kaizenstar Technologies",
  role: ".NET Developer",
  period: "December 2024 – Present",
  location: "Kerala, India",
  type: "Full-Time Enterprise Engineering",
  summary:
    "Developing and maintaining enterprise backend architectures, mission-critical clinic management and inventory ERP systems, custom migration frameworks, background job orchestration, and automated document generation pipelines.",
  technologies: [
    "C#",
    ".NET Core",
    "ASP.NET Core Web API",
    ".NET Framework",
    "MySQL",
    "Stored Procedures",
    "Hangfire",
    "Hosted Services",
    "QuestPDF",
    "FastReport",
    "RDLC",
    "Git",
  ],
  keyContributions: [
    {
      title: "Automated Database Migration Framework",
      description:
        "Engineered an automated in-house database migration engine using ASP.NET Core Hosted Services, embedded SQL scripts, strict schema version tracking, and MySQL application-level locking to guarantee safe, deterministic deployments across distributed client instances.",
      technicalHighlights: [
        "ASP.NET Core Hosted Services (IHostedService lifecycle)",
        "Embedded resource SQL scripts with cryptographic verification",
        "Deterministic version tracking and migration history tables",
        "MySQL distributed locking mechanisms to eliminate concurrent upgrade collisions",
      ],
    },
    {
      title: "Enterprise Background Job Architecture",
      description:
        "Architected reliable background processing pipelines using Hangfire to offload resource-intensive workloads from the web thread pool, managing asynchronous workflows with high throughput.",
      technicalHighlights: [
        "Fire-and-forget processing for non-blocking operations",
        "Deterministic recurring and scheduled jobs for data aggregation",
        "Concurrent execution policies with custom retry resilience",
        "Hangfire Dashboard integration with role-based access control",
      ],
    },
    {
      title: "Document Generation & Industrial Reporting Engines",
      description:
        "Designed and implemented high-volume document generation engines producing pixel-precise clinical invoices, patient reports, diagnostic summaries, and ERP inventory ledgers across varied reporting platforms.",
      technicalHighlights: [
        "Dynamic code-driven PDF generation via QuestPDF",
        "Complex enterprise reporting via FastReport and RDLC templates",
        "High-performance streaming to prevent memory pressure on large export runs",
      ],
    },
    {
      title: "Enterprise APIs & Domain Modules",
      description:
        "Built robust ASP.NET Core RESTful APIs powering Clinic Management and Inventory ERP workflows, optimizing stored procedure execution, multi-tenant boundaries, and Windows desktop client integrations.",
      technicalHighlights: [
        "Optimized MySQL stored procedures reducing query latency on large datasets",
        "Secure integration boundaries for legacy .NET Framework desktop clients",
        "Standardized API error response envelopes and centralized exception filters",
      ],
    },
  ],
};
