import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="hover:bg-transparent"
    >
      {isDark ? (
        <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] text-black" />
      )}
      <span className="sr-only">Cambiar tema</span>
    </Button>
  );
}
