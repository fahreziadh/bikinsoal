import CardSoalHistory from "@/components/card-soal-history";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const page = async () => {
  const questions = await api.questions.getAll.query();
  return (
    <div className="container">
      <Link href='/'> 
      <Button className="mt-4" variant='link'><ArrowLeft size={14} className="mr-2"/>Kembali</Button>
      </Link>
      <h1 className="mb-4 mt-2 text-xl font-bold">History Soal</h1>
      <div className="flex flex-col gap-4 mb-8">
        {questions.map((question, i) => (
          <CardSoalHistory
            key={i}
            index={i + 1}
            soal={question.question}
            options={[
              question.optionA ?? "",
              question.optionB ?? "",
              question.optionC ?? "",
              question.optionD ?? "",
            ]}
            createdAt={question.createdAt}
            updatedAt={question.updatedAt}
            answer={question.answer ?? ""}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
