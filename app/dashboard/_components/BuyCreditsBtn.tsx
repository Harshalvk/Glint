"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

const BuyCreditsBtn = ({ className }: { className?: string }) => {
  return <Button className={cn("rounded-full", className)}>Buy credits</Button>;
};

export default BuyCreditsBtn;
