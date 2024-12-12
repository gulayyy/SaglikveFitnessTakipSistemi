using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;
using System.Collections.Generic;
using System.Linq;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FitnessLevelsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FitnessLevelsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetFitnessLevels()
        {
            var levels = _context.FitnessLevels.ToList();
            return Ok(levels);
        }

        [HttpGet("{id}")]
        public IActionResult GetFitnessLevel(int id)
        {
            var level = _context.FitnessLevels.FirstOrDefault(x => x.FitnessLevelID == id);
            if (level == null)
                return NotFound();

            return Ok(level);
        }

        [HttpPost]
        public IActionResult CreateFitnessLevel([FromBody] FitnessLevel level)
        {
            if (level == null)
                return BadRequest();

            _context.FitnessLevels.Add(level);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetFitnessLevel), new { id = level.FitnessLevelID }, level);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateFitnessLevel(int id, [FromBody] FitnessLevel level)
        {
            if (id != level.FitnessLevelID)
                return BadRequest();

            var existingLevel = _context.FitnessLevels.FirstOrDefault(x => x.FitnessLevelID == id);
            if (existingLevel == null)
                return NotFound();

            existingLevel.FitnessScore = level.FitnessScore;
            existingLevel.AssessmentDate = level.AssessmentDate;
            existingLevel.Comments = level.Comments;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFitnessLevel(int id)
        {
            var level = _context.FitnessLevels.FirstOrDefault(x => x.FitnessLevelID == id);
            if (level == null)
                return NotFound();

            _context.FitnessLevels.Remove(level);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
