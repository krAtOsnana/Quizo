import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCreateQuiz from "@/hooks/useCreateQuiz";
import { Label } from "@radix-ui/react-label";

const QuizForm = () => {
  const [quiz, setQuiz] = useState({ title: "", description: "" });
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], correctOption: 0 }
  ]);
  const { loading, createQuiz } = useCreateQuiz();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", options: ["", "", "", ""], correctOption: 0 }
    ]);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, qIndex) => qIndex !== index));
  };

  const handleQuizChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    if (field === "text") newQuestions[index].text = value;
    else if (field === "correctOption")
      newQuestions[index].correctOption = Number(value);
    else newQuestions[index].options[Number(field)] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {
        await createQuiz({
            title: quiz.title,
            description: quiz.description,
            questions: questions.map((q) => ({
                text: q.text,
                options: q.options.map((opt, i) => ({
                    text: opt,
                    isCorrect: i === q.correctOption
                }))
            }))
        });

        // Clear the form after successful submission
        setQuiz({ title: '', description: '' }); // Reset quiz state
        setQuestions([{ text: '', options: ['', '', '', ''], correctOption: 0 }]); // Reset questions array with one empty question
    } catch (error) {
        console.error("Error creating quiz:", error);
        // Handle the error (e.g., display an error message to the user)
    }


  };

  return (
    <Card className="max-w-l w-full mx-auto min-h-full  bg-gradient-to-br from-red-800 to-black- text-white shadow-lg p-4">
      <CardHeader>
        <CardTitle className="text-4xl">Create a Quiz</CardTitle>
      </CardHeader>
      <CardContent className="text-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
          <Label >Quiz Title :</Label>
          <Input
            type="text"
            name="title"
            placeholder="Quiz Title"
            value={quiz.title}
            onChange={handleQuizChange}
            className=""
          />
          </div>
          <div>
          <Label>Quiz Description:</Label>
          <Textarea
            name="description"
            placeholder="Quiz Description"
            value={quiz.description}
            onChange={handleQuizChange}
            className=""
          />
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="space-y-2 border-t pt-4 relative">
                <Label>Question {qIndex +1} : </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder="Question Text"
                  value={q.text}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "text", e.target.value)
                  }
                  className=" flex-1"
                />
                <Button
                  type="button"
                  onClick={() => deleteQuestion(qIndex)}
                  className="bg-red-500 text-white px-2 py-1 text-sm"
                >
                  Delete
                </Button>
              </div>

              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctOption === optIndex}
                    onChange={() =>
                      handleQuestionChange(qIndex, "correctOption", optIndex)
                    }
                  />
                  <Input
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleQuestionChange(
                        qIndex,
                        String(optIndex),
                        e.target.value
                      )
                    }
                    className=""
                  />
                </div>
              ))}
            </div>
          ))}

          <Button
            type="button"
            onClick={addQuestion}
            className="w-full bg-blue-500"
          >
            Add Question
          </Button>
          <Button
            type="submit"
            className="w-full bg-green-500  " 
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Quiz"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QuizForm;
