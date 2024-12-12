using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using System.Collections.Generic;
using System.Linq;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisePlansController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ExercisePlansController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetExercisePlans()
        {
            var plans = _context.ExercisePlans.ToList();
            return Ok(plans);
        }

        [HttpGet("{id}")]
        public IActionResult GetExercisePlan(int id)
        {
            var plan = _context.ExercisePlans.FirstOrDefault(x => x.PlanID == id);
            if (plan == null)
                return NotFound();

            return Ok(plan);
        }

        [HttpPost]
        public IActionResult CreateExercisePlan([FromBody] ExercisePlan plan)
        {
            if (plan == null)
                return BadRequest();

            _context.ExercisePlans.Add(plan);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetExercisePlan), new { id = plan.PlanID }, plan);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateExercisePlan(int id, [FromBody] ExercisePlan plan)
        {
            if (id != plan.PlanID)
                return BadRequest();

            var existingPlan = _context.ExercisePlans.FirstOrDefault(x => x.PlanID == id);
            if (existingPlan == null)
                return NotFound();

            existingPlan.ExerciseName = plan.ExerciseName;
            existingPlan.DurationInMinutes = plan.DurationInMinutes;
            existingPlan.FrequencyPerWeek = plan.FrequencyPerWeek;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteExercisePlan(int id)
        {
            var plan = _context.ExercisePlans.FirstOrDefault(x => x.PlanID == id);
            if (plan == null)
                return NotFound();

            _context.ExercisePlans.Remove(plan);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
