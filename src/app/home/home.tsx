"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ListSoalPlaceholder from "./ListSoalPlaceholder";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useCompletion } from "ai/react";
import { cn } from "@/lib/utils";
import ListSoal from "./ListSoal";
import { SwitchOption } from "./SwitchOption";
import { useState } from "react";
import { type Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

export default function Home({ session }: Props) {
  const [withOption, setWithOption] = useState(false);
  const router = useRouter();
  const [input, setInput] = useState("");
  const { mutate } = useSWRConfig()
  const { completion, complete, isLoading } = useCompletion({
    api: `/api/ai?withOption=${withOption}&userId=${session?.user.id ?? ""}`,
    onFinish() {
      mutate('/api/token').catch(e => (console.log(e)))
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }
    if (input) {
      await complete(input);
    }
  };

  return (
    <div className="container">
      <div className="mt-[60px] flex flex-col items-center justify-center">
        <Image src={"/logo.png"} width={100} height={100} alt="Logo" />
        <h1 className="text-2xl font-medium">Bikin Soal</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex w-full max-w-[500px]  flex-col items-center gap-2"
        >
          <Input
            required
            onChange={(e) => setInput(e.target.value)}
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

          <SwitchOption onCheckedChange={setWithOption} checked={withOption} />
          <div className="text-sm text-rose-500">
            {completion.split("(e)").at(1)}
          </div>
        </form>
      </div>
      <ListSoal soalText={completion} withOption={withOption} session={session} />
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

interface Props {
  session: Session | null;
}
