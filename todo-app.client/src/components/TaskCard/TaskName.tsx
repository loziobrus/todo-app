import { TextField } from "@mui/material";
import { useState } from "react";
import "./styles.css";

interface TaskNameProps {
  name: string;
  onNameChange: (priority: string) => void;
}

const TaskName = ({ name, onNameChange }: TaskNameProps) => {
  const [inputValue, setInputValue] = useState<string>(name);

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleNameSave = () => {
    if (inputValue !== name) {
      onNameChange(inputValue);
    }
  };

  return (
    <TextField
      className="task-name"
      variant="standard"
      slotProps={{
        input: {
          disableUnderline: true,
        },
      }}
      value={inputValue}
      onChange={handlePriorityChange}
      onBlur={() => handleNameSave()}
    />
  );
};

export default TaskName;
