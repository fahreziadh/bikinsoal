"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListSoalPlaceholder from "./ListSoalPlaceholder";
import Image from "next/image";
import { ChevronRight, SaveAll } from "lucide-react";
import { useCompletion } from "ai/react";
import CardSoal from "@/components/card-soal";
import { cn } from "@/lib/utils";

export default function Home() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/ai",
    });

  return (
    <div className="container">
      <div className="mt-[60px] flex flex-col items-center justify-center">
        <Image src={"/logo.png"} width={150} height={150} alt="Logo" />
        <h1 className="text-2xl font-medium">Bikin Soal</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full max-w-[500px]  flex-col items-center gap-2"
        >
          <Input
            onChange={handleInputChange}
            value={input}
            className="mx-auto"
            placeholder="4 Soal matematika, kelas 2 Sma, dengan topik 'Aljabar'"
          />
          <Button
            disabled={isLoading && input != ""}
            type="submit"
            className="w-[120px]"
          >
            {isLoading && input ? (
              "Loading..."
            ) : (
              <>
                Generate <ChevronRight className="ml-2" size={16} />
              </>
            )}
          </Button>
          <div className="text-sm text-rose-500">
            {completion.split("(e)").at(1)}
          </div>
        </form>
      </div>
      {completion.split("(q)").length > 1 ? (
        <div className="mt-4 items-center inline-flex w-full justify-between">
          <div>{`Total Soal: ${completion.split("(q)").length - 1}`}</div>
          <Button variant={"secondary"}>
            <SaveAll size={16} className="mr-2" />
            Simpan Semua
          </Button>
        </div>
      ) : null}
      <div className="mt-4 flex flex-col gap-4">
        {completion.split("(q)").map((soal, i) => {
          if (i < 1) return null;
          return <CardSoal key={i} soal={soal} index={i} />;
        })}
      </div>
      <ListSoalPlaceholder
        state={
          cn(
            isLoading && input && "loading",
            !isLoading && !completion && "idle",
            completion && "success",
          ) as "idle" | "loading" | "success"
        }
      />
    </div>
  );
}
