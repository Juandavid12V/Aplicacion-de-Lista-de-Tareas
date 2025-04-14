using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// 👇 Cadena de conexión PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 👇 CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// 👇 Usa CORS
app.UseCors();

app.MapControllers();

app.Run();
