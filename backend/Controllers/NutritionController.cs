using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;
using System.Linq;
using System.Threading.Tasks;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NutritionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NutritionController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Nutritions
        [HttpGet]
        public async Task<IActionResult> GetNutritions()
        {
            var nutrition = await _context.Nutritions.ToListAsync();
            return Ok(nutrition);
        }

        // GET: api/Nutritions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetNutrition(int id)
        {
            var nutrition = await _context.Nutritions
                .FirstOrDefaultAsync(x => x.NutritionID == id);

            if (nutrition == null)
                return NotFound();

            return Ok(nutrition);
        }

        // POST: api/Nutritions
        [HttpPost]
        public async Task<IActionResult> CreateNutrition([FromBody] Nutrition nutrition)
        {
            if (nutrition == null)
                return BadRequest();

            _context.Nutritions.Add(nutrition);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNutrition), new { id = nutrition.NutritionID }, nutrition);
        }

        // PUT: api/Nutritions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNutrition(int id, [FromBody] Nutrition nutrition)
        {
            if (id != nutrition.NutritionID)
                return BadRequest();

            var existingNutrition = await _context.Nutritions
                .FirstOrDefaultAsync(x => x.NutritionID == id);

            if (existingNutrition == null)
                return NotFound();

            existingNutrition.MealType = nutrition.MealType;
            existingNutrition.Calories = nutrition.Calories;
            existingNutrition.MealDate = nutrition.MealDate;
            existingNutrition.DietPlanID = nutrition.DietPlanID;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Nutritions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNutrition(int id)
        {
            var nutrition = await _context.Nutritions
                .FirstOrDefaultAsync(x => x.NutritionID == id);

            if (nutrition == null)
                return NotFound();

            _context.Nutritions.Remove(nutrition);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
