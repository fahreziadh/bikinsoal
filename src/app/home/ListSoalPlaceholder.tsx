import CardSoalPlaceHolder from "@/components/card-soal-placeholder";
import React from "react";

const ListSoalPlaceholder = () => {
  return (
    <div className="flex flex-col mt-8 max-w-[500px] mx-auto">
      <CardSoalPlaceHolder className="opacity-90" />
      <CardSoalPlaceHolder className="mt-1 scale-90 opacity-75"/>
      <CardSoalPlaceHolder className="scale-75 opacity-50 -translate-y-2"/>
      <CardSoalPlaceHolder className="scale-50 -translate-y-9 opacity-25"/>
    </div>
  );
};

export default ListSoalPlaceholder;
