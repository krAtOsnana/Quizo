import { useEffect, useState } from 'react';
import axios from 'axios';

interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface Question {
    id: string;
    text: string;
    options: Option[];
}

interface Quiz {
    id: string;
    title: string;
    description: string;
    questions: Question[];
}

const useGetQuizzes = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('/quizzes'); // Adjust the URL as needed
                setQuizzes(response.data);
            } catch (err) {
                console.error("Error fetching quizzes:", err);
                setError("Failed to retrieve quizzes.");
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []); // Empty dependency array means this runs once on mount

    return { quizzes, loading, error };
};

export default useGetQuizzes;
