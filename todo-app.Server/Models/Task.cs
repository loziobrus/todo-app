namespace todo_app.Server.Models
{
    public class Task
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Priority { get; set; }

        public Status Status { get; set; }
    }
}
