using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly ActivityService _service;

        public ActivityController(ActivityService service)
        {
            _service = service;
        }

        // Kullanıcıya göre aktiviteleri getir
        [HttpGet("user/{userID}")]
        public async Task<ActionResult<IEnumerable<Activity>>> GetActivitiesByUserId(int userID)
        {
            var activities = await _service.GetActivitiesByUserIdAsync(userID);

            if (activities == null || !activities.Any())
            {
                return NotFound(new { message = "No activities found for this user." });
            }

            return Ok(activities);
        }

        // GET: api/Activity
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> GetAllActivities()
        {
            return Ok(await _service.GetAllActivitiesAsync());
        }

        // GET: api/Activity/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(int id)
        {
            var activity = await _service.GetActivityByIdAsync(id);
            if (activity == null)
            {
                return NotFound();
            }
            return Ok(activity);
        }

        // POST: api/Activity
        [HttpPost]
        public async Task<ActionResult<Activity>> CreateActivity(Activity activity)
        {
            // Kullanıcı bilgisi frontend'den gönderilmeli veya token'dan alınmalı
            if (activity.UserID == 0)
            {
                return BadRequest(new { message = "UserID is required to create an activity." });
            }

            var createdActivity = await _service.CreateActivityAsync(activity);
            return CreatedAtAction(nameof(GetActivity), new { id = createdActivity.ActivityID }, createdActivity);
        }


        // PUT: api/Activity/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActivity(int id, Activity activity)
        {
            if (id != activity.ActivityID)
            {
                return BadRequest();
            }

            await _service.UpdateActivityAsync(activity);
            return NoContent();
        }

        // DELETE: api/Activity/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(int id)
        {
            await _service.DeleteActivityAsync(id);
            return NoContent();
        }
    }
}
