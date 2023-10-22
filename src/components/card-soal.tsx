import React, { useEffect } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { useCompletion } from "ai/react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="flex w-full flex-col">
        <div className={cn("mb-3 w-full font-semibold")}>
          {soal?.replace("(s)", "")}
        </div>
        {!withOption && textAnswear.length > 0 ? (
          <div className="text-sm">Jawaban Benar : {textAnswear.replace("(a)", "")}</div>
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
  withOption?: boolean;
}

export default CardSoal;
