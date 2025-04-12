using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using todo_app.Server.Models;

namespace todo_app.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
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
            var tasks = _memoryCache.Get<List<Models.Task>>(CACHE_KEY) ?? new List<Models.Task>();

            return Ok(tasks);
        }

        [HttpPost(Name = "CreateTask")]
        public IActionResult AddNewTask([FromBody] Models.Task newTask)
        {
            var tasks = _memoryCache.Get<List<Models.Task>>(CACHE_KEY) ?? new List<Models.Task>();

            if (tasks.Any(task => task.Id == newTask.Id))
            {
                return BadRequest("Task with this Id already exists.");
            }

            if (tasks.Any(task => task.Name == newTask.Name))
            {
                return BadRequest("Task with this name already exists.");
            }

            if (string.IsNullOrEmpty(newTask.Name))
            {
                return BadRequest("Task name cannot be empty.");
            }

            tasks.Add(newTask);

            _memoryCache.Set(CACHE_KEY, tasks);

            return Ok(tasks);
        }

        [HttpPut("{id}/edit", Name = "EditTask")]
        public IActionResult EditTask(int id, [FromBody] Models.Task editedTask)
        {
            var tasks = _memoryCache.Get<List<Models.Task>>(CACHE_KEY) ?? new List<Models.Task>();

            if (tasks.Any(current => current.Name == editedTask.Name && current.Id != editedTask.Id))
            {
                return BadRequest("Task with this name already exists.");
            }

            var taskToEdit = tasks.FirstOrDefault(task => task.Id == id);

            if(taskToEdit == null)
            {
                return NotFound("Task not found.");
            }

            taskToEdit.Status = editedTask.Status;
            taskToEdit.Priority = editedTask.Priority;
            taskToEdit.Name = editedTask.Name;

            _memoryCache.Set(CACHE_KEY, tasks);

            return Ok(tasks);
        }

        [HttpDelete("{id}/delete", Name = "DeleteTask")]
        public IActionResult DeleteTask(int id)
        {
            var tasks = _memoryCache.Get<List<Models.Task>>(CACHE_KEY) ?? new List<Models.Task>();

            var taskToDelete = tasks.FirstOrDefault(task => task.Id == id);

            if (taskToDelete == null)
            {
                return NotFound("Task not found.");
            }

            if (taskToDelete.Status != Status.Completed)
            {
                return BadRequest("Finish your task first, lazy potato...");
            }

            tasks.RemoveAll(task => task.Id == id);

            _memoryCache.Set(CACHE_KEY, tasks);

            return Ok(tasks);
        }
    }
}
