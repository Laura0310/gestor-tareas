import { useMemo } from "react";
import { TasksByStatus } from "../types/task";

const useTaskCounts = (tasks: TasksByStatus) => {
  const taskCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};

    Object.keys(tasks).forEach((status) => {
      counts[status] = tasks[status].length;
    });

    return counts;
  }, [tasks]);

  return taskCounts;
};

export default useTaskCounts;
