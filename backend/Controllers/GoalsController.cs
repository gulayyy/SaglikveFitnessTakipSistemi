using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalController : ControllerBase
    {
        private readonly GoalService _service;

        public GoalController(GoalService service)
        {
            _service = service;
        }

        // GET: api/Goal/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Goal>>> GetGoalsByUser(int userId)
        {
            var goals = await _service.GetGoalsByUserIdAsync(userId);
            if (goals == null || !goals.Any())
            {
                return NotFound();
            }
            return Ok(goals);
        }


        // GET: api/Goal
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Goal>>> GetAllGoals()
        {
            return Ok(await _service.GetAllGoalsAsync());
        }

        // GET: api/Goal/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Goal>> GetGoal(int id)
        {
            var goal = await _service.GetGoalByIdAsync(id);
            if (goal == null)
            {
                return NotFound();
            }
            return Ok(goal);
        }

        // POST: api/Goal
        [HttpPost]
        public async Task<ActionResult<Goal>> CreateGoal(Goal goal)
        {
            var createdGoal = await _service.CreateGoalAsync(goal);
            return CreatedAtAction(nameof(GetGoal), new { id = createdGoal.GoalID }, createdGoal);
        }

        // PUT: api/Goal/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGoal(int id, Goal goal)
        {
            if (id != goal.GoalID)
            {
                return BadRequest();
            }

            await _service.UpdateGoalAsync(goal);
            return NoContent();
        }

        // DELETE: api/Goal/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGoal(int id)
        {
            await _service.DeleteGoalAsync(id);
            return NoContent();
        }
    }
}
