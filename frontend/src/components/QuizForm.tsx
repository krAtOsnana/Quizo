import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCreateQuiz from "@/hooks/useCreateQuiz";

const QuizForm = () => {
  const [quiz, setQuiz] = useState({ title: "", description: "" });
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctOption: 0 },
  ]);
  const { loading, createQuiz } = useCreateQuiz();

  const addQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], correctOption: 0 }]);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, qIndex) => qIndex !== index));
  };

  const handleQuizChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    if (field === "text") newQuestions[index].text = value;
    else if (field === "correctOption") newQuestions[index].correctOption = Number(value);
    else newQuestions[index].options[Number(field)] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuiz({
      title: quiz.title,
      description: quiz.description,
      questions: questions.map(q => ({
        text: q.text,
        options: q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.correctOption })),
      })),
    });
  };

  return (
    <Card className="w-full max-w-2xl bg-gradient-to-br from-red-800 to-black- text-white shadow-lg p-6">
      <CardHeader>
        <CardTitle>Create a Quiz</CardTitle>
      </CardHeader>
      <CardContent className="">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="title"
            placeholder="Quiz Title"
            value={quiz.title}
            onChange={handleQuizChange}
            className="text-black"
          />
          <Textarea
            name="description"
            placeholder="Quiz Description"
            value={quiz.description}
            onChange={handleQuizChange}
            className="text-black"
          />
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="space-y-2 border-t pt-4 relative">
              <Button
                type="button"
                onClick={() => deleteQuestion(qIndex)}
                className="absolute right-0 top-0 bg-red-500 text-white px-2 py-1 text-sm"
              >
                Delete
              </Button>
              <Input
                type="text"
                placeholder="Question Text"
                value={q.text}
                onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)}
                className="text-black"
              />
              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctOption === optIndex}
                    onChange={() => handleQuestionChange(qIndex, "correctOption", optIndex)}
                  />
                  <Input
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt}
                    onChange={(e) => handleQuestionChange(qIndex, String(optIndex), e.target.value)}
                    className="text-black"
                  />
                </div>
              ))}
            </div>
          ))}
          <Button type="button" onClick={addQuestion} className="w-full bg-blue-500">
            Add Question
          </Button>
          <Button type="submit" className="w-full bg-green-500" disabled={loading}>
            {loading ? "Submitting..." : "Submit Quiz"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuizForm;
