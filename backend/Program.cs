using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull;
    });

// CORS ayarlarını ekleyin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Veritabanı bağlantısını ekler
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Servisleri ekler
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<WaterTrackingService>();
builder.Services.AddScoped<SleepTrackingService>();
builder.Services.AddScoped<ReminderService>();
builder.Services.AddScoped<MotivationalQuoteService>();
builder.Services.AddScoped<MedicalRecordService>();
builder.Services.AddScoped<GoalService>();
builder.Services.AddScoped<BodyMeasurementService>();
builder.Services.AddScoped<ActivityService>();

var app = builder.Build();

// CORS middleware'ini ekleyin
app.UseCors("AllowAll");

// HTTP istek yönlendirmesi
app.UseRouting();

app.UseAuthorization();

// Tüm Controller'ları yönlendirir
app.MapControllers();

// Ana sayfa için test rotası
app.MapGet("/", () => "Backend çalışıyor");

app.Run();
