var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(); // Controller desteğini ekler

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseAuthorization();

app.MapControllers(); // Controller'ları yönlendirir
app.MapGet("/", () => "Backend çalışıyor"); // Sadece ana sayfa rotası

app.Run();
