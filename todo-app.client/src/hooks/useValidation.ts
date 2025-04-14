import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setError } from "../store/taskSlice";
import { Status } from "../types";

const useValidation = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.tasks);

  const isValidTaskName = useCallback(
    (name: string): boolean => {
      if (!name) {
        dispatch(setError("Task name cannot be empty."));
        return false;
      }

      if (tasks.some((task) => task.name === name)) {
        dispatch(setError("Task with this name already exists."));
        return false;
      }
      return true;
    },
    [tasks, dispatch]
  );

  const isValidPriorityValue = useCallback((priority: unknown) => {
    if (typeof priority !== "number") {
      dispatch(setError("Priority must be a number."));
      return false;
    }

    return true;
  }, []);

  const canDelete = useCallback(
    (taskId: string): boolean => {
      const task = tasks.find((task) => task.id === taskId);
      if (!task) {
        dispatch(setError("Task with this ID not found."));
        return false;
      }

      if (task.status !== Status.Completed) {
        dispatch(setError("Finish your task first, lazy potato..."));
        return false;
      }
      return true;
    },
    [tasks, dispatch]
  );

  return { isValidTaskName, isValidPriorityValue, canDelete };
};

export default useValidation;
