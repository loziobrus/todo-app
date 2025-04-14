import { TextField } from "@mui/material";
import { useState } from "react";
import useValidation from "../../hooks/useValidation";

interface TaskPriorityProps {
  priority: number;
  onPriorityChange: (priority: number) => void;
}

const TaskPriority = ({ priority, onPriorityChange }: TaskPriorityProps) => {
  const { isValidPriorityValue } = useValidation();
  const [inputValue, setInputValue] = useState<number>(priority);

  const handlePriorityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(Number(event.target.value));
  };

  const handlePrioritySave = () => {
    if (inputValue !== priority && isValidPriorityValue(inputValue)) {
      onPriorityChange(inputValue);
    }
  };

  return (
    <TextField
      type="number"
      variant="standard"
      slotProps={{
        input: {
          disableUnderline: true,
        },
      }}
      className="task-priority"
      value={inputValue}
      onChange={handlePriorityChange}
      onBlur={() => handlePrioritySave()}
    />
  );
};

export default TaskPriority;
