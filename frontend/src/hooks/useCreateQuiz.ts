import { useState } from "react";
import toast from "react-hot-toast";

type Option = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  text: string;
  options: Option[];
};

type QuizInputs = {
  title: string;
  description: string;
  questions: Question[];
};

const useCreateQuiz = () => {
  const [loading, setLoading] = useState(false);

  const createQuiz = async (inputs: QuizInputs) => {
    try {
      setLoading(true);
      
      const res = await fetch("/api/quiz/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputs.title,
          description: inputs.description,
        }),
      });

      const quizData = await res.json();
      if (!res.ok) throw new Error(quizData.error);

      // Add questions to the created quiz
      for (const question of inputs.questions) {
        const questionRes = await fetch(`/api/quiz/quizzes/${quizData.id}/questions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(question),
        });

        const questionData = await questionRes.json();
        if (!questionRes.ok) throw new Error(questionData.error);
      }

      toast.success("Quiz created successfully!");
      return quizData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, createQuiz };
};

export default useCreateQuiz;
