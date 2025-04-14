import { FC } from "react";
import { Task } from "../../types/Task";
import TaskItem from "./TaskItem";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  filteredTasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  editingTaskId: number | null;
  setEditingTaskId: (id: number | null) => void;
  fromDate?: string; // Prop para la fecha de inicio
  toDate?: string; // Prop para la fecha de fin
}

const TaskList: FC<Props> = ({
  filteredTasks,
  toggleTask,
  deleteTask,
  editTask,
  editingTaskId,
  setEditingTaskId,
  fromDate,
  toDate,
}) => {
  // Filtrar las tareas por fecha si se proporcionan fromDate y toDate
  const filteredByDate = filteredTasks.filter((task) => {
    const taskDate = new Date(task.createdAt);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from && taskDate < from) return false;
    if (to && taskDate > to) return false;

    return true;
  });

  return (
    <Card className="bg-gray-800 text-white shadow-2xl border border-gray-700 mt-4">
      <CardContent className="p-4">
        <ul className="space-y-3">
          {filteredByDate.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
              editingTaskId={editingTaskId}
              setEditingTaskId={setEditingTaskId}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TaskList;
