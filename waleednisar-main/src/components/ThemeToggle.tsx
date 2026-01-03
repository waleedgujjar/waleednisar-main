import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl bg-glass/60 backdrop-blur-lg border border-glass-border hover:border-primary/50 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative w-5 h-5"
      >
        <motion.div
          initial={false}
          animate={{ 
            opacity: theme === "dark" ? 1 : 0,
            scale: theme === "dark" ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-primary" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            opacity: theme === "light" ? 1 : 0,
            scale: theme === "light" ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
