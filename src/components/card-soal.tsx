import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

const CardSoal = ({
  className,
  soal,
  index,
  isSoalFullyLoaded,
}: CardSoalProps) => {

  return (
    <Card className={cn("flex space-x-4 p-4", className)}>
      <div
        className={cn(
          "text-md flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground/50",
        )}
      >
        {index}
      </div>
      <div className="space-y-2">
        <div className={cn("w-full rounded-full")}>{soal}</div>
      </div>
    </Card>
  );
};
interface CardSoalProps {
  className?: string;
  soal?: string;
  index?: number;
  isSoalFullyLoaded?: boolean;
}

export default CardSoal;
