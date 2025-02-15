import express from "express";
import protectRoute from "../middleware/protectRoutes.js";
import { addQuestion, createQuiz, deleteQuestion, deleteQuiz, getQuizById, getQuizzes, updateQuiz } from "../controllers/quiz.controller.js";

const router = express.Router()

router.post("/quizzes", protectRoute, createQuiz);
router.get("/quizzes", protectRoute, getQuizzes);
router.get("/quizzes/:id", protectRoute, getQuizById);
router.put("/quizzes/:id", protectRoute, updateQuiz);
router.delete("/quizzes/:id", protectRoute, deleteQuiz);


router.post("/quizzes/:quizId/questions", protectRoute, addQuestion);
router.delete("/questions/:questionId", protectRoute, deleteQuestion);

export default router
