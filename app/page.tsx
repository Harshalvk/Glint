"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-5xl font-bold">hello</h1>
      <Button onClick={() => alert("Hello from Glint!!")}>Click me!!</Button>
    </div>
  );
}
