import { useRef, useState } from "react";
import { Add } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import useValidation from "../../hooks/useValidation";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addTask } from "../../store/services";
import "./styles.css";

const NewTask = () => {
  const dispatch = useAppDispatch();
  const { isValidTaskName } = useValidation();
  const error = useAppSelector((state) => state.tasks.error);

  const inputRef = useRef<HTMLInputElement>(null);
  const [taskName, setTaskName] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidTaskName(taskName)) {
      const result = await dispatch(addTask(taskName)).unwrap();
      if (result) {
        inputRef.current!.value = "";
      }
    }
  };

  return (
    <Box className="new-task">
      <form onSubmit={handleAddTask}>
        <TextField
          required
          slotProps={{
            htmlInput: {
              "data-testid": "newTask.input",
            },
          }}
          inputRef={inputRef}
          placeholder="New task"
          variant="outlined"
          onChange={handleInputChange}
        />
        <Button
          data-testid="newTask.addButton"
          type="submit"
          variant="contained"
          color="primary"
        >
          <Add />
        </Button>
      </form>
      {error ? (
        <Typography
          data-testid="newTask.errorMessage"
          variant="h6"
          component="p"
          color="error"
        >
          {error}
        </Typography>
      ) : null}
    </Box>
  );
};

export default NewTask;
