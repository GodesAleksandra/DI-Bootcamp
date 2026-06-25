/*Create a Trivia Quiz Game with Express.js and express.Router
Instructions
1. Set up a new Express.js application.
2. Create a trivia quiz model with a set of hard-coded questions and answers.
3. Implement the following routes using express.Router:

GET /quiz: Start the quiz and display the first question.
POST /quiz: Submit an answer to the current question and move to the next question.
GET /quiz/score: Display the user’s final score at the end of the quiz.
4. Keep track of the user’s score as they progress through the quiz.
5. Provide appropriate feedback on correct and incorrect answers.
6. Implement simple game logic such as displaying the next question after answering one.*/

const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());
const PORT = 3000;

const indexRouter = require('./routes/quiz');

app.use(session({
    secret: 'super-secret-quiz-key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 }
}));

app.use('/quiz', indexRouter);

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});