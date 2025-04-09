"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { Sun, Moon, LaptopMinimal } from "lucide-react";

const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <Tabs defaultValue="system" className="scale-90 rounded-full">
      <TabsList className="rounded-full">
        <TabsTrigger
          value="light"
          className="rounded-full text-xs"
          onClick={() => setTheme("light")}
        >
          <Sun />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          className="rounded-full"
          onClick={() => setTheme("dark")}
        >
          <Moon />
        </TabsTrigger>
        <TabsTrigger
          value="system"
          className="rounded-full"
          onClick={() => setTheme("system")}
        >
          <LaptopMinimal />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ModeToggle;
