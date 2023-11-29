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
import { motion } from "framer-motion";

export default function Home({ session }: Props) {
  const [withOption, setWithOption] = useState(false);
  const router = useRouter();
  const [input, setInput] = useState("");
  const { mutate } = useSWRConfig();
  const { completion, complete, isLoading } = useCompletion({
    api: `/api/ai?withOption=${withOption}&userId=${session?.user.id ?? ""}`,
    onFinish() {
      mutate("/api/token").catch((e) => console.log(e));
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
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          bounce: 500,
          stiffness: 100,
        }}
        className="mt-[60px] flex flex-col items-center justify-center"
      >
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
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          bounce: 500,
          stiffness: 100,
        }}
      >
        <ListSoal
          soalText={completion}
          withOption={withOption}
          session={session}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          type: "spring",
          bounce: 500,
          stiffness: 100,
        }}
      >
        <ListSoalPlaceholder
          state={
            cn(
              isLoading && input && "loading",
              !isLoading && !completion && "idle",
              completion && "success",
            ) as "idle" | "loading" | "success"
          }
        />
      </motion.div>
    </div>
  );
}

interface Props {
  session: Session | null;
}
