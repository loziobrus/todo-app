namespace todo_app.Server.Models
{
    public class Task
    {
        public required string Id { get; set; }

        public required string Name { get; set; }

        public int Priority { get; set; }

        public Status Status { get; set; }
    }
}
