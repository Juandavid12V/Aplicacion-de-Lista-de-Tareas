using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApi.Models;


namespace TaskApi.Controllers
{
  [ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
private readonly AppDbContext _context;

public TasksController(AppDbContext context)
{
    _context = context;
}

[HttpGet("debug")]
public string DebugConnection()
{
    return _context.Database.GetDbConnection().ConnectionString;
}


[HttpGet]
public IActionResult GetTasks([FromQuery] DateTime? from, [FromQuery] DateTime? to)
{
    var query = _context.Tasks.AsQueryable(); 

    if (from.HasValue)
        query = query.Where(t => t.CreatedAt >= from.Value);

    if (to.HasValue)
        query = query.Where(t => t.CreatedAt <= to.Value);

    return Ok(query.ToList());
}


[HttpPost]
public async Task<IActionResult> AddTask(TaskItem task)
{
    task.CreatedAt = task.CreatedAt == default ? DateTime.UtcNow : task.CreatedAt;
    _context.Tasks.Add(task);
    await _context.SaveChangesAsync();
    return Ok(task);
}

[HttpPut("{id}")]
public async Task<IActionResult> UpdateTask(int id, TaskItem updatedTask)
{
    var task = await _context.Tasks.FindAsync(id);
    if (task == null) return NotFound();

    task.Text = updatedTask.Text;
    task.Done = updatedTask.Done;

    await _context.SaveChangesAsync();
    return Ok(task);
}

[HttpDelete("{id}")]
public async Task<IActionResult> DeleteTask(int id)
{
    var task = await _context.Tasks.FindAsync(id);
    if (task == null) return NotFound();

    _context.Tasks.Remove(task);
    await _context.SaveChangesAsync();
    return NoContent();
}
}

}
