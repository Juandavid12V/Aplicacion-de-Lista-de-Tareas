// src/components/TaskInput.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FC } from "react";

interface TaskInputProps {
  input: string;
  setInput: (value: string) => void;
  addTask: () => void;
}

const TaskInput: FC<TaskInputProps> = ({ input, setInput, addTask }) => {
  return (
    <div className="flex gap-2 mb-4">
      <Input
        type="text"
        placeholder="Nueva tarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button onClick={addTask}>Agregar</Button>
    </div>
  );
};

export default TaskInput;
