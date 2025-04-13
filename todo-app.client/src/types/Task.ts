import Status from "./Status";

interface Task {
  id: string;
  name: string;
  status: Status;
  priority: number;
}

export default Task;
