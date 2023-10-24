import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { useCompletion } from "ai/react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { TooltipShared } from "./tooltip-shared";
import dayjs from "dayjs";

const CardSoalHistory = ({
  className,
  soal,
  answer,
  index,
  options,
  createdAt,
  updatedAt,
}: CardSoalHistoryProps) => {
  return (
    <Card className={cn("flex space-x-4 p-4", className)}>
      <div
        className={cn(
          "text-md flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground/50",
        )}
      >
        {index}
      </div>
      <div className="flex w-full flex-col">
        <div className={cn("mb-3 w-full font-semibold")}>
          {soal?.replace("(stop)", "")}
        </div>
        <>
          {options?.[0] ? (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>A. {options[0]}</div>
              <div>B. {options[1]}</div>
              <div>C. {options[2]}</div>
              <div>D. {options[3]}</div>
            </div>
          ) : null}
          <p className="mt-3 text-sm">Jawaban Benar: {answer}</p>
          <p className="mt-4 text-xs text-secondary-foreground/50">Dibuat : {dayjs(createdAt).format("DD, MMM YYYY, hh:mm")}</p>
        </>
      </div>
    </Card>
  );
};
interface CardSoalHistoryProps {
  className?: string;
  soal?: string;
  options?: string[];
  answer?: string;
  index?: number;
  userId?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export default CardSoalHistory;
