import useGetQuizzes from '@/hooks/useGetQuizzes';
import React from 'react';
 // Adjust the path as necessary

const QuizzesList: React.FC = () => {
    const { quizzes, loading, error } = useGetQuizzes();

    if (loading) return <p>Loading quizzes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>My Quizzes</h1>
            <ul>
                {quizzes.map(quiz => (
                    <li key={quiz.id}>
                        <h2>{quiz.title}</h2>
                        <p>{quiz.description}</p>
                        <h3>Questions:</h3>
                        <ul>
                            {quiz.questions.map(question => (
                                <li key={question.id}>
                                    <p>{question.text}</p>
                                    <h4>Options:</h4>
                                    <ul>
                                        {question.options.map(option => (
                                            <li key={option.id}>
                                                {option.text} {option.isCorrect ? "(Correct)" : ""}
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizzesList;
