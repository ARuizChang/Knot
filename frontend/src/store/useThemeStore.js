import { create } from "zustand";

export const useThemeStore = create((set) => ({
    currentTheme: localStorage.getItem("chat-theme") || "light",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ currentTheme: theme });
    }
}));