import { Chip } from "@mui/material";
import { Category } from "../../types";

interface TaskCategoryProps {
  category: Category;
}

const TaskCategory = ({ category }: TaskCategoryProps) => {
  const getCategoryLabel = (category: Category) => {
    switch (category) {
      case Category.Normal:
        return "Normal";
      case Category.Urgent:
        return "Urgent";
      default:
        return "Unknown";
    }
  };

  return (
    <Chip
      test-dataId="task-category"
      className="task-progress"
      label={getCategoryLabel(category)}
    />
  );
};

export default TaskCategory;
