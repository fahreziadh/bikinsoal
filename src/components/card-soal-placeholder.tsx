import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

const CardSoalPlaceHolder = ({ className }: CardSoalPlaceHolderProps) => {
  return (
    <Card className={cn("flex items-center space-x-4 p-4", className)}>
      <div className="h-12 w-12 rounded-full bg-secondary" />
      <div className="space-y-2">
        <div className="h-4 w-[250px] rounded-full bg-secondary" />
        <div className="h-4 w-[200px] rounded-full bg-secondary" />
        <div className="h-4 w-[100px] rounded-full bg-secondary" />
      </div>
    </Card>
  );
};
interface CardSoalPlaceHolderProps {
  className?: string;
}

export default CardSoalPlaceHolder;
