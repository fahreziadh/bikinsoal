import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { useCompletion } from "ai/react";
import { Button } from "./ui/button";
import { RefreshCcw, Save } from "lucide-react";
import { TooltipShared } from "./tooltip-shared";
import toast from "react-hot-toast";

const CardSoal = ({ className, soal, index, withOption }: CardSoalProps) => {
  const {
    completion: textAnswear,
    complete: onGetTextAnswear,
    isLoading: isLoadingAnswear,
  } = useCompletion({
    api: "/api/ai/answear",
  });

  const {
    completion: textOption,
    complete: onGetTextOption,
    isLoading: isLoadingOption,
  } = useCompletion({
    api: "/api/ai/options",
  });

  useEffect(() => {
    onRegenerateAnswear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soal]);

  function onRegenerateAnswear() {
    const stop = soal?.split("(s)").length ?? 0;
    if (stop > 1 && soal && (!isLoadingAnswear || !isLoadingOption)) {
      if (withOption) {
        onGetTextOption(soal).catch(() => {
          console.log("error");
        });
      } else {
        onGetTextAnswear(soal).catch(() => {
          console.log("error");
        });
      }
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
        {!withOption && textAnswear.length > 0 ? (
          <div className="text-sm">
            Jawaban Benar : {textAnswear.replace("(a)", "")}
          </div>
        ) : null}
        {withOption && textOption.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>A. {textOption.split("(a)").at(1)?.split("(").at(0)}</div>
              <div>B. {textOption.split("(b)").at(1)?.split("(").at(0)}</div>
              <div>C. {textOption.split("(c)").at(1)?.split("(").at(0)}</div>
              <div>D. {textOption.split("(d)").at(1)?.split("(").at(0)}</div>
            </div>
            <p className="mt-3 text-sm font-medium">
              Jawaban Benar:{" "}
              {textOption.split("(correct)")?.at(1)?.toUpperCase()}
            </p>
          </>
        ) : null}

        <div className="inline-flex gap-2 self-end">
          <TooltipShared tooltipText="Re-generate Jawaban">
            <Button
              disabled={isLoadingAnswear || isLoadingOption}
              onClick={onRegenerateAnswear}
              size="sm"
              variant="secondary"
              className="w-max"
            >
              <RefreshCcw size={14} />
            </Button>
          </TooltipShared>
          <TooltipShared tooltipText="Simpan soal ini">
            <Button
              disabled={isLoadingAnswear || isLoadingOption}
              onClick={onSaveQuestion}
              size="sm"
              variant="secondary"
              className="w-max"
            >
              <Save size={14} />
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
