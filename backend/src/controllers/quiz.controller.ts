import { Request, Response } from "express";
import prisma from "../db/prisma.js";



/**
 * Create a new quiz
 */
export const createQuiz = async (req: Request, res: Response): Promise<any> => {
    try {
        const { title, description } = req.body;
        const teacherId = req.user.id; // Coming from protectRoute middleware

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }

        const quiz = await prisma.quiz.create({
            data: { title, description, teacherId },
        });

        res.status(201).json(quiz);
    } catch (error) {
        console.error("Error creating quiz:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Retrieve all quizzes created by the logged-in teacher
 */
export const getQuizzes = async (req: Request, res: Response): Promise<any> => {
    try {
        const teacherId = req.user.id;
        const quizzes = await prisma.quiz.findMany({
            where: { teacherId },
            include: { questions: true }, // Include questions
        });

        res.status(200).json(quizzes);
    } catch (error) {
        console.error("Error retrieving quizzes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Retrieve a specific quiz by ID, including questions and options
 */
export const getQuizById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const quiz = await prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    include: { options: true }, // Include options inside questions
                },
            },
        });

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found." });
        }

        res.status(200).json(quiz);
    } catch (error) {
        console.error("Error retrieving quiz:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Update an existing quiz (title or description)
 */
export const updateQuiz = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedQuiz = await prisma.quiz.update({
            where: { id },
            data: { title, description },
        });

        res.status(200).json(updatedQuiz);
    } catch (error) {
        console.error("Error updating quiz:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Delete a quiz (and cascade delete related questions & options)
 */
export const deleteQuiz = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        await prisma.quiz.delete({ where: { id } });

        res.status(200).json({ message: "Quiz deleted successfully." });
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Add a question to a quiz
 */
export const addQuestion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { quizId } = req.params;
        const { text, options } = req.body; // options should be an array of { text, isCorrect }

        if (!text || !options || !Array.isArray(options)) {
            return res.status(400).json({ error: "Question text and options are required." });
        }

        const question = await prisma.question.create({
            data: {
                text,
                quizId,
                options: {
                    create: options,
                },
            },
            include: { options: true }, // Return options as well
        });

        res.status(201).json(question);
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * Delete a question from a quiz
 */
export const deleteQuestion = async (req: Request, res: Response): Promise<any> => {
    try {
        const { questionId } = req.params;

        await prisma.question.delete({ where: { id: questionId } });

        res.status(200).json({ message: "Question deleted successfully." });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


