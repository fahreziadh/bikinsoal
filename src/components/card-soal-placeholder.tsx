import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

const CardSoalPlaceHolder = ({
  className,
  state,
}: CardSoalPlaceHolderProps) => {
  return (
    <Card className={cn("flex items-center space-x-4 p-4", className)}>
      <div
        className={cn(
          "h-12 w-12 rounded-full bg-secondary",
          state == "loading" && "animate-pulse",
        )}
      />
      <div className="space-y-2">
        <div
          className={cn(
            "h-4 w-[250px] rounded-full bg-secondary",
            state == "loading" && "animate-pulse",
          )}
        />
        <div
          className={cn(
            "h-4 w-[200px] rounded-full bg-secondary",
            state == "loading" && "animate-pulse",
          )}
        />
        <div
          className={cn(
            "h-4 w-[100px] rounded-full bg-secondary",
            state == "loading" && "animate-pulse",
          )}
        />
      </div>
    </Card>
  );
};
interface CardSoalPlaceHolderProps {
  className?: string;
  state?: "idle" | "loading" | "error" | "success";
}

export default CardSoalPlaceHolder;
