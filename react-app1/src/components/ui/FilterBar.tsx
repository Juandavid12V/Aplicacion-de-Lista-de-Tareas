import { Filter, SortAsc, SortDesc } from "lucide-react";
import { motion } from "framer-motion";

type FilterBarProps = {
  filter: "all" | "completed" | "pending";
  setFilter: (filter: "all" | "completed" | "pending") => void;
  sortType: "alphabetical" | "date";
  setSortType: (type: "alphabetical" | "date") => void;
};

export default function FilterBar({
  filter,
  setFilter,
  sortType,
  setSortType,
}: FilterBarProps) {
  return (
    <motion.div
      className="flex flex-col items-center space-y-3 my-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div className="flex justify-center space-x-2" layout>
        {["all", "completed", "pending"].map((type) => (
          <motion.button
            layout
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-3 py-1 rounded transition-colors duration-200 ${
              filter === type
                ? type === "all"
                  ? "bg-blue-500 text-white"
                  : type === "completed"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-500 text-white"
                : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
            }`}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {type === "all"
              ? "Todas"
              : type === "completed"
              ? "Completadas"
              : "Pendientes"}
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="flex items-center space-x-2" layout>
        <motion.button
          layout
          onClick={() => setSortType("alphabetical")}
          className={`px-3 py-1 rounded transition-colors duration-200 ${
            sortType === "alphabetical"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          }`}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          A-Z
        </motion.button>

        <motion.button
          layout
          onClick={() => setSortType("date")}
          className={`px-4 py-1  rounded transition-colors duration-200 ${
            sortType === "date"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          }`}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          Recientes
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
