import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./ThemeProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default AppProvider;
