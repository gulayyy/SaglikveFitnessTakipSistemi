using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Data;
using SaglikveFitnessTakipSistemi.Models;

[ApiController]
[Route("api/[controller]")]
public class NotificationsController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotificationsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Notifications
    [HttpGet]
    public async Task<IActionResult> GetNotifications()
    {
        var notifications = await _context.Notifications.ToListAsync();
        return Ok(notifications);
    }

    // GET: api/Notifications/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetNotification(int id)
    {
        var notification = await _context.Notifications.FindAsync(id);
        if (notification == null) return NotFound();
        return Ok(notification);
    }

    // POST: api/Notifications
    [HttpPost]
    public async Task<IActionResult> CreateNotification(Notification notification)
    {
        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetNotification), new { id = notification.NotificationID }, notification);
    }

    // PUT: api/Notifications/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNotification(int id, Notification notification)
    {
        if (id != notification.NotificationID) return BadRequest();

        _context.Entry(notification).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/Notifications/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNotification(int id)
    {
        var notification = await _context.Notifications.FindAsync(id);
        if (notification == null) return NotFound();

        _context.Notifications.Remove(notification);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
