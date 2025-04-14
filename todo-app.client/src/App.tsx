import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useAppDispatch } from "./store/store";
import { fetchTasks } from "./store/services";
import TaskList from "./components/TaskList/TaskList";
import NewTask from "./components/NewTask/NewTask";
import "./App.css";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

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
