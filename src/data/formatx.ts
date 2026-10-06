import { FormatXSpec } from "@/types";

export const formatXData: FormatXSpec = {
  name: "FormatX",
  title: "File Conversion SaaS Platform",
  tagline: "High-performance file transformation, parsing, and document processing built on Clean Architecture.",
  description:
    "FormatX is an end-to-end full-stack SaaS platform designed for high-throughput file conversion, document generation, and structured clinical/data parsing. Built from scratch to prove enterprise backend principles in an independent product, FormatX couples an Angular single-page frontend with an ASP.NET Core Clean Architecture backend, Dapper micro-ORM, and PostgreSQL.",
  liveUrl: "https://format-x-web.vercel.app/",
  githubUrl: "https://github.com/Shuaib-sh",
  features: [
    {
      title: "HL7 Healthcare Parser",
      description:
        "Parses complex Health Level Seven (HL7 v2) clinical messaging standards into structured JSON models with instant field-level inspection and validation.",
      badge: "Clinical Standard",
    },
    {
      title: "JSON Formatter & Validator",
      description:
        "High-performance JSON beautification, minification, tree-structure traversal, and schema validation with real-time syntax checking.",
      badge: "Developer Tooling",
    },
    {
      title: "PDF-to-Image & Image-to-PDF",
      description:
        "Bidirectional multi-page rasterization and compilation powered by ImageSharp and iText7 with custom DPI, margin, and compression settings.",
      badge: "Document Engine",
    },
    {
      title: "Text-to-PDF Engine",
      description:
        "Compiles raw structured text and markdown into clean, formatted, downloadable PDF documents with dynamic pagination and header/footer stamps.",
      badge: "Dynamic Export",
    },
    {
      title: "Stream-Based Server Processing",
      description:
        "Engineered zero-disk-waste streaming pipelines that process uploads directly in memory buffers, avoiding unbounded disk I/O bottlenecks.",
      badge: "Performance",
    },
    {
      title: "Real-Time Processing Feedback",
      description:
        "Reactive UI status signals displaying conversion progress, payload sizes, processing durations, and instantaneous one-click secure downloads.",
      badge: "UX / Reactive",
    },
  ],
  architectureLayers: [
    {
      layer: "Presentation Layer (UI)",
      tech: "Angular 16 + RxJS + Tailwind",
      description:
        "Single-page application featuring reactive state management via BehaviorSubjects, HTTP Interceptors for token injection, and Google Sign-In SDK.",
      role: "Client",
    },
    {
      layer: "API / Gateway Layer",
      tech: "ASP.NET Core Web API",
      description:
        "RESTful endpoints with global exception middleware, FluentValidation pipeline behaviors, CORS configuration, and JWT authentication filters.",
      role: "Entrypoint",
    },
    {
      layer: "Application Core",
      tech: "C# Clean Architecture",
      description:
        "Encapsulates domain models, business logic interfaces, DTOs, and the Factory Pattern for dynamically instantiating file converter engines.",
      role: "Business Rules",
    },
    {
      layer: "Infrastructure & Data Access",
      tech: "Dapper + Npgsql + PostgreSQL (Supabase)",
      description:
        "Decoupled repositories executing optimized raw SQL queries through Dapper micro-ORM, minimizing memory footprint and maximizing serialization speed.",
      role: "Persistence",
    },
    {
      layer: "Processing Engines",
      tech: "iText7 + SixLabors.ImageSharp",
      description:
        "Stream-oriented document composition and image processing pipelines operating directly on in-memory buffers without disk storage overhead.",
      role: "Engine",
    },
  ],
  authFlow: [
    {
      step: "01. User Authentication",
      detail: "Client submits email/password credentials OR Google OAuth 2.0 Identity Token to the auth endpoint.",
    },
    {
      step: "02. Token Issuance",
      detail:
        "Server validates credentials (or verifies Google token with Google API) and issues a short-lived JWT Access Token (15 min) and a cryptographically random Refresh Token (7 days).",
    },
    {
      step: "03. Authenticated Requests",
      detail: "Angular HTTP Interceptor automatically attaches the JWT Access Token in the Authorization header (Bearer).",
    },
    {
      step: "04. Silent Token Refresh",
      detail:
        "When an API request returns HTTP 401 Unauthorized, the interceptor transparently calls /refresh with the refresh token, stores the new JWT, and automatically retries the initial request without user interruption.",
    },
  ],
  technicalDecisions: [
    {
      decision: "Why Clean Architecture?",
      rationale:
        "Decouples the core conversion logic and user authentication completely from UI frameworks and specific database implementations, enabling unit testing and independent evolution.",
    },
    {
      decision: "Why Dapper instead of EF Core?",
      rationale:
        "FormatX needs predictable, lightning-fast queries with zero ORM change-tracking overhead. Dapper provides near-raw-ADO.NET performance with clean object mapping.",
    },
    {
      decision: "Why Factory Pattern for Converters?",
      rationale:
        "Each file format conversion (HL7, PDF, JSON, Image) implements a common IFileConverter interface. The factory instantiates the correct handler dynamically based on the input MIME type.",
    },
    {
      decision: "Why Stream-Based In-Memory Processing?",
      rationale:
        "Writing uploads to temporary server disk creates I/O bottlenecks and potential privacy/cleanup issues. Streams process data in-flight with immediate garbage collection.",
    },
  ],
};
