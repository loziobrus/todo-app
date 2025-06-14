import { Category } from "./Category";
import { Status } from "./Status";

export type Task = {
  id: string;
  name: string;
  status: Status;
  priority: number;
  category: Category;
};
