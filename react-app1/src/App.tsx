import { useState, useEffect } from "react";
import TaskList from "./components/tasks/TaskList";
import TaskInput from "./components/tasks/TaskInput";
import FilterBar from "./components/ui/FilterBar";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { toast } from "sonner";

type Task = {
  id: number;
  text: string;
  done: boolean;
  createdAt: string;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [sortType, setSortType] = useState<"alphabetical" | "date">(
    "alphabetical"
  );
  const [fromDate, setFromDate] = useState<string | undefined>(undefined);
  const [toDate, setToDate] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch("http://localhost:5026/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error al obtener tareas:", err));
  }, []);

  const addTask = async () => {
    if (input.trim() !== "") {
      const newTask = {
        text: input,
        done: false,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:5026/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const created = await res.json();
      setTasks([...tasks, created]);
      setInput("");

      toast.success("Tarea agregada ✅");
    }
  };

  const editTask = async (id: number, newText: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    await fetch(`http://localhost:5026/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, text: newText }),
    });

    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    setEditingTaskId(null);
  };

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    await fetch(`http://localhost:5026/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, done: !task.done }),
    });

    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:5026/api/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((t) => t.id !== id));

    toast.error("Tarea eliminada 🗑️");
  };

  const filteredTasks = tasks
    .slice()
    .sort((a, b) => {
      if (sortType === "alphabetical") {
        return a.text.localeCompare(b.text);
      } else {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    })
    .filter((task) => {
      // Filtrar por estado
      if (filter === "completed") return task.done;
      if (filter === "pending") return !task.done;

      // Filtrar por fecha
      const taskDate = new Date(task.createdAt).toISOString().split("T")[0]; // Solo la fecha sin la hora
      if (fromDate && taskDate < fromDate) return false;
      if (toDate && taskDate > toDate) return false;

      return true;
    });

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <MainContent
        input={input}
        setInput={setInput}
        addTask={addTask}
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        editTask={editTask}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        filteredTasks={filteredTasks}
        setFilter={setFilter}
        filter={filter}
        sortType={sortType}
        setSortType={setSortType}
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
    </ThemeProvider>
  );
}

type Props = {
  input: string;
  setInput: (val: string) => void;
  addTask: () => void;
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  editTask: (id: number, newText: string) => void;
  editingTaskId: number | null;
  setEditingTaskId: (id: number | null) => void;
  filteredTasks: Task[];
  setFilter: (filter: "all" | "completed" | "pending") => void;
  filter: "all" | "completed" | "pending";
  sortType: "alphabetical" | "date";
  setSortType: (type: "alphabetical" | "date") => void;
  fromDate: string | undefined;
  toDate: string | undefined;
  setFromDate: (date: string | undefined) => void;
  setToDate: (date: string | undefined) => void;
};
function MainContent({
  input,
  setInput,
  addTask,
  toggleTask,
  deleteTask,
  editTask,
  editingTaskId,
  setEditingTaskId,
  filteredTasks,
  setFilter,
  filter,
  sortType,
  setSortType,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: Props) {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <motion.div
        className={`relative w-full max-w-4xl p-10 rounded-2xl shadow-2xl transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold">✅ Lista de Tareas</h2>
          <ModeToggle />
        </div>

        <TaskInput input={input} setInput={setInput} addTask={addTask} />

        {/* Contenedor de filtros y fechas */}
        <div className="flex gap-8 mb-6">
          {/* Fechas alineadas horizontalmente */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="font-semibold text-gray-700 dark:text-gray-300">
                Desde:
              </label>
              <input
                type="date"
                onChange={(e) => setFromDate(e.target.value)}
                value={fromDate || ""}
                className="p-1.5 border rounded-lg border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="font-semibold text-gray-700 dark:text-gray-300">
                Hasta:
              </label>
              <input
                type="date"
                onChange={(e) => setToDate(e.target.value)}
                value={toDate || ""}
                className="p-1.5 border rounded-lg border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          {/* FilterBar debajo de las fechas */}
          <FilterBar
            filter={filter}
            setFilter={setFilter}
            sortType={sortType}
            setSortType={setSortType}
          />
        </div>

        <TaskList
          filteredTasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
        />
      </motion.div>
    </div>
  );
}
