import CardSoal from "@/components/card-soal";
import { Button } from "@/components/ui/button";
import { Bug, SaveAll } from "lucide-react";
import React from "react";

const ListSoal = ({ soalText = "", withOption = false }: ListSoalProps) => {
  return (
    <div>
      {soalText.split("(q)").length > 1 ? (
        <div className="mt-4 inline-flex w-full items-center justify-between">
          <div>{`Total Soal: ${soalText.split("(q)").length - 1}`}</div>
          <div className="inline-flex gap-2">
            <Button variant={"secondary"}>
              <SaveAll size={16} className="mr-2" />
              Simpan Semua
            </Button>
            <Button>
              <Bug size={16} />
            </Button>
          </div>
        </div>
      ) : null}
      <div className="mt-4 flex flex-col gap-4">
        {soalText.split("(q)").map((soal, i) => {
          if (i < 1) return null;
          return (
            <CardSoal withOption={withOption} key={i} soal={soal} index={i} />
          );
        })}
      </div>
    </div>
  );
};

interface ListSoalProps {
  soalText: string;
  withOption?: boolean;
}

export default ListSoal;
