import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { useCompletion } from "ai/react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { TooltipShared } from "./tooltip-shared";
import toast from "react-hot-toast";

const CardSoal = ({
  className,
  soal,
  index,
  withOption = false,
  userId,
}: CardSoalProps) => {
  const {
    completion: textAnswer,
    complete: onGetTextAnswer,
    isLoading: isLoadingAnswer,
  } = useCompletion({
    api: `/api/ai/answer?withOption=${withOption}&userId=${userId}`,
  });

  useEffect(() => {
    onRegenerateAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soal]);

  function onRegenerateAnswer() {
    const stop = soal?.split("(stop)").length ?? 0;
    if (stop > 1 && soal && !isLoadingAnswer) {
      onGetTextAnswer(soal).catch(() => {
        console.log("error");
      });
    }
  }

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
        {textAnswer.length > 0 ? (
          <>
            {withOption ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>A. {textAnswer.split("(a)").at(1)?.split("(").at(0)}</div>
                <div>B. {textAnswer.split("(b)").at(1)?.split("(").at(0)}</div>
                <div>C. {textAnswer.split("(c)").at(1)?.split("(").at(0)}</div>
                <div>D. {textAnswer.split("(d)").at(1)?.split("(").at(0)}</div>
              </div>
            ) : null}
            <p className="mt-3 text-sm">
              Jawaban Benar: {textAnswer.split("(correct)")?.at(1)}
            </p>
          </>
        ) : null}

        <div className="mt-2 inline-flex gap-2 self-end">
          <TooltipShared tooltipText="Re-generate Jawaban">
            <Button
              disabled={isLoadingAnswer}
              onClick={onRegenerateAnswer}
              size="sm"
              variant="secondary"
              className="w-max"
            >
              <RefreshCcw size={14} className="mr-2" /> Regenerate Jawaban
            </Button>
          </TooltipShared>
        </div>
      </div>
    </Card>
  );
};
interface CardSoalProps {
  className?: string;
  soal?: string;
  index?: number;
  withOption?: boolean;
  userId?: string;
}

export default CardSoal;
