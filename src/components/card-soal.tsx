import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { useCompletion } from "ai/react";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { TooltipShared } from "./tooltip-shared";
import toast from "react-hot-toast";

const CardSoal = ({ className, soal, index, withOption }: CardSoalProps) => {
  const {
    completion: textAnswear,
    complete: onGetTextAnswear,
    isLoading: isLoadingAnswear,
  } = useCompletion({
    api: `/api/ai/answear?withOption=${withOption}`,
  });

  useEffect(() => {
    onRegenerateAnswear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soal]);

  function onRegenerateAnswear() {
    const stop = soal?.split("(s)").length ?? 0;
    if (stop > 1 && soal && !isLoadingAnswear) {
      onGetTextAnswear(soal).catch(() => {
        console.log("error");
      });
    }
  }

  function onSaveQuestion() {
    toast("Working in Progress");
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
          {soal?.replace("(s)", "")}
        </div>
        {textAnswear.length > 0 ? (
          <>
            {withOption ? (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>A. {textAnswear.split("(a)").at(1)?.split("(").at(0)}</div>
                <div>B. {textAnswear.split("(b)").at(1)?.split("(").at(0)}</div>
                <div>C. {textAnswear.split("(c)").at(1)?.split("(").at(0)}</div>
                <div>D. {textAnswear.split("(d)").at(1)?.split("(").at(0)}</div>
              </div>
            ) : null}
            <p className="mt-3 text-sm">
              Jawaban Benar:{" "}
              {textAnswear.split("(correct)")?.at(1)}
            </p>
          </>
        ) : null}

        <div className="mt-2 inline-flex gap-2 self-end">
          <TooltipShared tooltipText="Re-generate Jawaban">
            <Button
              disabled={isLoadingAnswear}
              onClick={onRegenerateAnswear}
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
}

export default CardSoal;
