import CardSoalHistory from "@/components/card-soal-history";
import { api } from "@/trpc/server";

const page = async () => {
  const questions = await api.questions.getAll.query();
  return (
    <div className="container">
      <h1 className="mb-4 mt-8 text-xl font-bold">History Soal</h1>
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
