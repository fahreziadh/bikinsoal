import CardSoal from "@/components/card-soal";
import { type Session } from "next-auth";
import React from "react";

const ListSoal = ({ soalText = "", withOption = false, session }: ListSoalProps) => {
  return (
    <div>
      {soalText.split("(q)").length > 1 ? (
        <div className="mt-4 inline-flex w-full items-center justify-between">
          <div>{`Total Soal: ${soalText.split("(q)").length - 1}`}</div>
        </div>
      ) : null}
      <div className="mt-4 flex flex-col gap-4">
        {soalText.split("(q)").map((soal, i) => {
          if (i < 1) return null;
          return (
            <CardSoal withOption={withOption} key={i} soal={soal} index={i} userId={session?.user.id} />
          );
        })}
      </div>
    </div>
  );
};

interface ListSoalProps {
  soalText: string;
  withOption?: boolean;
  session?: Session | null;
}

export default ListSoal;
