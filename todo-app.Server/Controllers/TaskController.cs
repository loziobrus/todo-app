using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using todo_app.Server.Models;

namespace todo_app.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ILogger<TaskController> _logger;
        private readonly IMemoryCache _memoryCache;

        private readonly string CACHE_KEY = "tasks";

        public TaskController(ILogger<TaskController> logger, IMemoryCache memoryCache)
        {
            _logger = logger;
            _memoryCache = memoryCache;
        }

        [HttpGet("getTaskList", Name = "GetTaskList")]
        public IActionResult GetTaskList()
        {
            List<Models.Task> tasks = _memoryCache.Get<List<Models.Task>>(CACHE_KEY)?.OrderBy(o => o.Priority).ToList() ?? new List<Models.Task>();

            return Ok(tasks);
        }

        [HttpPost("add", Name = "CreateTask")]
        public IActionResult AddNewTask([FromBody] string taskName)
        {
            var tasks = _memoryCache.Get<List<Models.Task>>(CACHE_KEY) ?? new List<Models.Task>();

            if (tasks.Any(task => task.Name == taskName))
            {
                return BadRequest("Task with this name already exists.");
            }

            if (string.IsNullOrEmpty(taskName))
            {
                return BadRequest("Task name cannot be empty.");
            }

            var newTask = new Models.Task
            {
                Id = Guid.NewGuid().ToString(),
                Name = taskName,
                Priority = 1,
                Status = Status.NotStarted
            };

            tasks.Add(newTask);

            _memoryCache.Set(CACHE_KEY, tasks);

            return Ok(newTask);
        }

        [HttpPut("{taskId}/edit", Name = "EditTask")]
        public IActionResult EditTask(string taskId, [FromBody] Models.Task editedTask)
        {
            var tasks = _memoryCache.Get<List<Models.Task>>(CACHE_KEY) ?? new List<Models.Task>();

            if (tasks.Any(current => current.Name == editedTask.Name && current.Id != editedTask.Id))
            {
                return BadRequest("Task with this name already exists.");
            }

            var taskToEdit = tasks.FirstOrDefault(task => task.Id == taskId);

            if(taskToEdit == null)
            {
                return NotFound("Task not found.");
            }

            taskToEdit.Status = editedTask.Status;
            taskToEdit.Priority = editedTask.Priority;
            taskToEdit.Name = editedTask.Name;

            _memoryCache.Set(CACHE_KEY, tasks);

            return Ok(taskToEdit);
        }

        [HttpDelete("{taskId}/delete", Name = "DeleteTask")]
        public IActionResult DeleteTask(string taskId)
        {
            var tasks = _memoryCache.Get<List<Models.Task>>(CACHE_KEY) ?? new List<Models.Task>();

            var taskToDelete = tasks.FirstOrDefault(task => task.Id == taskId);

            if (taskToDelete == null)
            {
                return NotFound("Task not found.");
            }

            if (taskToDelete.Status != Status.Completed)
            {
                return BadRequest("Finish your task first, lazy potato...");
            }

            tasks.RemoveAll(task => task.Id == taskId);

            _memoryCache.Set(CACHE_KEY, tasks);

            return Ok(taskId);
        }
    }
}
