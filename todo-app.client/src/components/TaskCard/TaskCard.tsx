import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { Task, Status } from "../../types";
import { useAppDispatch } from "../../store/store";
import { deleteTask, editTask } from "../../store/services";
import useValidation from "../../hooks/useValidation";
import TaskProgress from "./TaskProgress";
import TaskPriority from "./TaskPriority";
import TaskName from "./TaskName";
import "./styles.css";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const dispatch = useAppDispatch();
  const { canDelete } = useValidation();

  const handleDelete = () => {
    if (canDelete(task.id)) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleStatusChange = (status: Status) => {
    dispatch(editTask({ ...task, status }));
  };

  const handlePriorityChange = (priority: number) => {
    dispatch(editTask({ ...task, priority }));
  };

  const handleNameChange = (name: string) => {
    dispatch(editTask({ ...task, name }));
  };

  return (
    <Card variant="outlined" className="task-card">
      <CardHeader
        avatar={
          <div className="task-card-header">
            <TaskPriority
              priority={task.priority}
              onPriorityChange={handlePriorityChange}
            />
            <TaskProgress
              status={task.status}
              onStatusChange={handleStatusChange}
            />
          </div>
        }
      />
      <CardContent className="task-card-content">
        <TaskName name={task.name} onNameChange={handleNameChange} />
      </CardContent>
      <CardActions>
        <IconButton
          disabled={task.status !== Status.Completed}
          onClick={handleDelete}
          aria-label="delete"
          size="small"
          color="error"
        >
          <DeleteOutline />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
