import { useState } from "react";
import { Chip, Menu, MenuItem } from "@mui/material";
import { Status } from "../../types";

interface TaskProgressProps {
  status: Status;
  onStatusChange: (status: Status) => void;
}

const TaskProgress = ({ status, onStatusChange }: TaskProgressProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleStatusChange = (key: Status) => {
    if (key !== status) {
      onStatusChange(key);
    }
    setAnchorEl(null);
  };

  const getStatusLabel = (status: Status) => {
    switch (status) {
      case Status.NotStarted:
        return "Not Started";
      case Status.Completed:
        return "Completed";
      case Status.InProgress:
        return "In Progress";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case Status.NotStarted:
        return "info";
      case Status.Completed:
        return "success";
      case Status.InProgress:
        return "warning";
    }
  };

  return (
    <div>
      <Chip
        className="task-progress"
        label={getStatusLabel(status)}
        color={getStatusColor()}
        onClick={handleClick}
      />
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleStatusChange(Status.NotStarted)}>
          {getStatusLabel(Status.NotStarted)}
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(Status.InProgress)}>
          {getStatusLabel(Status.InProgress)}
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(Status.Completed)}>
          {getStatusLabel(Status.Completed)}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default TaskProgress;
