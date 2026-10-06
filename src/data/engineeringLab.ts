import { EngineeringLabItem } from "@/types";

export const engineeringLabItems: EngineeringLabItem[] = [
  {
    id: "auth-refresh-tokens",
    title: "Stateless JWT & Sliding Refresh Token Lifecycle",
    category: "Authentication & Security",
    badge: "Security Pattern",
    summary:
      "A dual-token architecture mitigating token theft risks with short-lived access tokens while providing friction-free sessions via automated sliding refresh tokens.",
    whyItMatters:
      "Storing long-lived JWTs exposes systems to irreversible replay attacks if leaked. Using short lifespans (15 mins) paired with revocable, rotating refresh tokens (7 days) delivers maximum security with seamless UX.",
    technicalMechanism:
      "The Angular HTTP interceptor intercepts outgoing requests to inject the Bearer token. Upon receiving a 401 response, the request is placed in a retry queue, a silent refresh exchange runs against /api/auth/refresh, the client tokens update, and queued requests replay seamlessly.",
    codeSnippet: {
      language: "csharp",
      title: "ASP.NET Core Token Validation & Claims",
      code: `// JwtTokenService.cs
public string GenerateAccessToken(User user)
{
    var claims = new[]
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        new Claim("role", user.Role)
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SecretKey));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: _jwtOptions.Issuer,
        audience: _jwtOptions.Audience,
        claims: claims,
        expires: DateTime.UtcNow.AddMinutes(15), // Short-lived 15 min token
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}`,
    },
    usedIn: "FormatX & Enterprise Identity",
  },
  {
    id: "clean-architecture-factory",
    title: "Clean Architecture & Factory Pattern in Converter Pipelines",
    category: "Architecture & Design Patterns",
    badge: "Structural Pattern",
    summary:
      "Decoupling API controllers and application logic from specific file format converters through a registry-driven Factory pattern.",
    whyItMatters:
      "Adding a new conversion format (e.g. Markdown-to-PDF or HL7) requires zero modifications to existing controllers or application services, honoring the Open/Closed Principle.",
    technicalMechanism:
      "An IFileConverter interface defines the conversion contract. Specific converters (e.g., Hl7ParserConverter, PdfImageConverter) are registered into the DI container with an enum descriptor. The FileConverterFactory resolves the exact implementation dynamically at runtime.",
    codeSnippet: {
      language: "csharp",
      title: "Converter Factory Resolution",
      code: `public interface IFileConverter
{
    ConversionType SupportedType { get; }
    Task<ConversionResult> ConvertAsync(Stream inputStream, ConversionOptions options);
}

public class FileConverterFactory : IFileConverterFactory
{
    private readonly IEnumerable<IFileConverter> _converters;
    public FileConverterFactory(IEnumerable<IFileConverter> converters)
    {
        _converters = converters;
    }

    public IFileConverter GetConverter(ConversionType type)
    {
        return _converters.FirstOrDefault(c => c.SupportedType == type)
            ?? throw new NotSupportedException($"Converter for {type} is not registered.");
    }
}`,
    },
    usedIn: "FormatX Backend Architecture",
  },
  {
    id: "hangfire-orchestration",
    title: "Hangfire Asynchronous Background Orchestration",
    category: "Background Processing",
    badge: "Resilience",
    summary:
      "Offloading long-running calculations, aggregation tasks, and recurring sync jobs outside the HTTP request lifecycle.",
    whyItMatters:
      "Enterprise systems cannot afford web thread starvation. Asynchronous execution guarantees sub-second HTTP responses while offloading heavy batch work to isolated background workers with automatic retries.",
    technicalMechanism:
      "Jobs are categorized into Fire-and-Forget (immediate background execution), Scheduled (deferred execution), and Recurring (cron-based). State is stored in a durable SQL database, protecting workloads from unexpected app pool recycles.",
    codeSnippet: {
      language: "csharp",
      title: "Hangfire Orchestration Pipeline",
      code: `// Enqueue non-blocking invoice generation (Fire-and-forget)
BackgroundJob.Enqueue<IReportingService>(service => 
    service.GenerateAndArchiveInvoiceAsync(invoiceId));

// Schedule inventory balance aggregation every night at 2 AM (Recurring)
RecurringJob.AddOrUpdate<IInventoryService>(
    "daily-stock-reconciliation",
    service => service.ReconcileDailyBalancesAsync(),
    Cron.Daily(2)
);`,
    },
    usedIn: "Kaizenstar Enterprise Clinic & Inventory ERP",
  },
  {
    id: "db-migrations-locking",
    title: "Deterministic DB Migration Engine with Distributed Locks",
    category: "Database Engineering",
    badge: "Infrastructure",
    summary:
      "A custom migration framework executing embedded SQL scripts with schema version tracking and application-level MySQL table locking.",
    whyItMatters:
      "When deploying new versions across multiple load-balanced or clustered instances, concurrent startup could trigger dual schema migrations, leading to corrupted database tables and deadlocks.",
    technicalMechanism:
      "An ASP.NET Core IHostedService runs on application startup before the web listener opens. It acquires a distributed named lock (e.g. GET_LOCK in MySQL), queries the schema history table, executes pending embedded .sql scripts in alphabetical sequence, and releases the lock.",
    codeSnippet: {
      language: "csharp",
      title: "Hosted Service Distributed Migration Worker",
      code: `public class DatabaseMigrationHostedService : IHostedService
{
    private readonly IDbConnectionFactory _connectionFactory;
    
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        using var conn = _connectionFactory.CreateConnection();
        await conn.OpenAsync(cancellationToken);
        
        // Acquire MySQL distributed lock to prevent multi-instance race conditions
        var acquired = await conn.QuerySingleAsync<int>(
            "SELECT GET_LOCK('app_schema_migration_lock', 60);");
            
        if (acquired == 1)
        {
            try {
                await ExecutePendingScriptsAsync(conn);
            } finally {
                await conn.ExecuteAsync("SELECT RELEASE_LOCK('app_schema_migration_lock');");
            }
        }
    }
}`,
    },
    usedIn: "Kaizenstar Enterprise Backend Infrastructure",
  },
  {
    id: "standardized-api-envelope",
    title: "Standardized API Response Envelopes & Centralized Error Middleware",
    category: "API Engineering",
    badge: "API Reliability",
    summary:
      "Uniform API response structure across all controllers, trapping unhandled exceptions and formatting validation failures into structured RFC 7807 problem details.",
    whyItMatters:
      "Frontends shouldn't need disparate parsing logic for success vs error states. A single contract prevents leaked stack traces in production and gives client apps predictable error codes.",
    technicalMechanism:
      "Custom middleware wraps HTTP responses and intercepts exceptions before they escape. FluentValidation filters automatically catch model validation errors and normalize them into a uniform structured envelope.",
    codeSnippet: {
      language: "csharp",
      title: "Centralized Error Handling Middleware",
      code: `public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public async Task InvokeAsync(HttpContext context)
    {
        try {
            await _next(context);
        } catch (Exception ex) {
            _logger.LogError(ex, "Unhandled exception encountered: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        var response = ApiResponse<object>.Failure("An unexpected server error occurred.");
        return context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}`,
    },
    usedIn: "FormatX & Kaizenstar REST APIs",
  },
  {
    id: "document-stream-pipelines",
    title: "High-Performance Document Compilation & Memory Streaming",
    category: "Document Engineering",
    badge: "Low Memory Footprint",
    summary:
      "High-throughput PDF and reporting generation streaming bytes directly to the HTTP response stream rather than buffering massive byte arrays in RAM or temporary disk.",
    whyItMatters:
      "High-volume document generation (e.g. hundreds of invoices or multi-page clinical charts) can trigger large object heap (LOH) fragmentation and memory spikes. Streaming directly reduces memory footprint by up to 80%.",
    technicalMechanism:
      "Using QuestPDF and iText7 with stream targets configured directly into ASP.NET Core's Response.BodyWriter or FileStreamResult with instant disposal of unmanaged resources.",
    codeSnippet: {
      language: "csharp",
      title: "Memory-Efficient PDF Streaming",
      code: `[HttpGet("invoice/{id}/pdf")]
public async Task<IActionResult> DownloadInvoicePdf(int id)
{
    var invoiceData = await _reportingService.GetInvoiceDataAsync(id);
    var stream = new MemoryStream();
    
    // Generate document directly to stream
    _documentEngine.Generate(invoiceData, stream);
    stream.Position = 0;
    
    return File(stream, "application/pdf", $"Invoice_{id}.pdf");
}`,
    },
    usedIn: "Kaizenstar Clinic ERP & FormatX",
  },
];
