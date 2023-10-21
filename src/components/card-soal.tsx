import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { useCompletion } from "ai/react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

const CardSoal = ({ className, soal, index }: CardSoalProps) => {
  const { completion, complete, isLoading } = useCompletion({
    api: "/api/ai/answear",
  });

  useEffect(() => {
    const stop = soal?.split("(s)").length ?? 0;
    if (stop > 1 && soal && !isLoading) {
      complete(soal).catch(() => {
        console.log("error");
      });
    }
  }, [soal]);

  return (
    <Card className={cn("flex space-x-4 p-4", className)}>
      <div
        className={cn(
          "text-md flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground/50",
        )}
      >
        {index}
      </div>
      <div className="flex flex-col space-y-2 w-full">
        <div className={cn("w-full font-semibold")}>
          {soal?.replace("(s)", "")}
        </div>
        <div className="text-sm">Jawaban: {completion.replace("(a)", "")}</div>
        <Button size="sm" variant="secondary" className="w-max self-end">
          <Save size={14} />
        </Button>
      </div>
    </Card>
  );
};
interface CardSoalProps {
  className?: string;
  soal?: string;
  index?: number;
}

export default CardSoal;
