import { Box } from "@mui/material";
import { useAppSelector } from "../../store/store";
import TaskCard from "../TaskCard/TaskCard";
import "./styles.css";

const TaskList = () => {
  const { tasks, loading } = useAppSelector((state) => state.tasks);

  const taskIds = tasks.map((task) => task.id);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="task-list">
      {taskIds.map((id) => (
        <TaskCard key={id} taskId={id} />
      ))}
    </Box>
  );
};

export default TaskList;
