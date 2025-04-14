import { FC } from "react";
import { Task } from "../../types/Task";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";

interface Props {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  editingTaskId: number | null;
  setEditingTaskId: (id: number | null) => void;
}

const TaskItem: FC<Props> = ({
  task,
  toggleTask,
  deleteTask,
  editTask,
  editingTaskId,
  setEditingTaskId,
}) => {
  return (
    <li className="flex items-center justify-between bg-gray-700 px-4 py-2 rounded-lg">
      <div className="flex items-center space-x-3">
        <div
          onClick={() => toggleTask(task.id)}
          className={`w-9 h-9 rounded border-3 flex items-center justify-center cursor-pointer transition-colors ${
            task.done
              ? "bg-gray-500 border-gray-500"
              : "border-gray-400 hover:border-white"
          }`}
          style={{ padding: "4px" }}
        >
          <AnimatePresence>
            {task.done && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-white text-[17px] leading-none"
              >
                ✅
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col">
          {editingTaskId === task.id ? (
            <input
              value={task.text}
              onChange={(e) => editTask(task.id, e.target.value)}
              onBlur={() => setEditingTaskId(null)}
              autoFocus
              className="bg-transparent border-b border-gray-400 text-white outline-none"
            />
          ) : (
            <>
              <span
                onDoubleClick={() => setEditingTaskId(task.id)}
                className={`cursor-text ${
                  task.done ? "line-through opacity-60" : ""
                }`}
              >
                {task.text}
              </span>
              <small className="text-xs text-gray-400">
                Agregada el {new Date(task.createdAt).toLocaleString()}
              </small>
            </>
          )}
        </div>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-400 hover:text-red-600 transition-colors"
        aria-label="Eliminar tarea"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TaskItem;
