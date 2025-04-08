import React from "react";
import { Toaster } from "@/components/ui/sonner";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
};

export default AppProvider;
