using Microsoft.AspNetCore.Mvc;
using SaglikveFitnessTakipSistemi.Models;
using SaglikveFitnessTakipSistemi.Data;
using System.Collections.Generic;
using System.Linq;

namespace SaglikveFitnessTakipSistemi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendshipsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FriendshipsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetFriendships()
        {
            var friendships = _context.Friendships.ToList();
            return Ok(friendships);
        }

        [HttpGet("{id}")]
        public IActionResult GetFriendship(int id)
        {
            var friendship = _context.Friendships.FirstOrDefault(x => x.FriendshipID == id);
            if (friendship == null)
                return NotFound();

            return Ok(friendship);
        }

        [HttpPost]
        public IActionResult CreateFriendship([FromBody] Friendship friendship)
        {
            if (friendship == null)
                return BadRequest();

            _context.Friendships.Add(friendship);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetFriendship), new { id = friendship.FriendshipID }, friendship);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateFriendship(int id, [FromBody] Friendship friendship)
        {
            if (id != friendship.FriendshipID)
                return BadRequest();

            var existingFriendship = _context.Friendships.FirstOrDefault(x => x.FriendshipID == id);
            if (existingFriendship == null)
                return NotFound();

            existingFriendship.UserID1 = friendship.UserID1;
            existingFriendship.UserID2 = friendship.UserID2;
            existingFriendship.FriendshipDate = friendship.FriendshipDate;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFriendship(int id)
        {
            var friendship = _context.Friendships.FirstOrDefault(x => x.FriendshipID == id);
            if (friendship == null)
                return NotFound();

            _context.Friendships.Remove(friendship);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
