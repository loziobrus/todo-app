import { Box } from "@mui/material";
import { useAppSelector } from "../../store/store";
import TaskCard from "../TaskCard/TaskCard";
import "./styles.css";

const TaskList = () => {
  const { tasks, loading } = useAppSelector((state) => state.tasks);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Box>
  );
};

export default TaskList;
