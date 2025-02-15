import express from 'express'
import authRouter from './routes/auth.route.js'
import quizRouter from './routes/quiz.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/quiz', quizRouter)

app.listen(5001,()=>{
    console.log("app is listening on port 5001");
})