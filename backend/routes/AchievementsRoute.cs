using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

public static class AchievementsRouter
{
    public static void MapAchievementsRoutes(this IApplicationBuilder app)
    {
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "Achievements",
                pattern: "api/achievements/{id?}",
                defaults: new { controller = "Achievements", action = "GetAll" });
        });
    }
}
