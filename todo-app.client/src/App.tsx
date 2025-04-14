import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useAppDispatch } from "./store/store";
import { deleteTask, editTask, fetchTasks } from "./store/services";
import { Task, Status } from "./types";
import TaskList from "./components/TaskList/TaskList";
import NewTask from "./components/NewTask/NewTask";
import "./App.css";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const handleEditClick = async () => {
    const updatedTask: Task = {
      id: "f29a17dd-0ca8-430a-9633-1f47ebf1c801",
      name: "Updated Task",
      priority: 1,
      status: Status.Completed,
    };
    dispatch(editTask(updatedTask));
  };

  const handleDeleteClick = async () => {
    const taskId = "f29a17dd-0ca8-430a-9633-1f47ebf1c801";
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="todo-app">
      <Typography variant="h3" component="h3">
        To do
      </Typography>
      <NewTask />
      <TaskList />
    </div>
  );
};

export default App;
