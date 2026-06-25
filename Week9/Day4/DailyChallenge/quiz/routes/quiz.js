const express = require('express')
const router = express.Router()

const triviaQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Moscow","Astana","New York"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Moscow","Mercury","Venus"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African bush elephant","Colossal Squid","Whale Shark"],
    answer: "Blue whale",
  },
];

const initQuizSession = (req, res, next) => {
    if (req.session.currentQuestionIndex === undefined) {
        req.session.currentQuestionIndex = 0;
        req.session.score = 0;
        req.session.quizCompleted = false;
    }
    next();
};

// 1. GET /quiz
router.get('/', initQuizSession, (req, res) => {
    if (req.session.quizCompleted) {
        return res.redirect('/quiz/score');
    }

    const currentIndex = req.session.currentQuestionIndex;

    if (currentIndex >= triviaQuestions.length) {
        req.session.quizCompleted = true;
        return res.redirect('/quiz/score');
    }

    const currentQuestion = triviaQuestions[currentIndex];

    res.json({
        message: `Question ${currentIndex + 1} from ${triviaQuestions.length}`,
        question: currentQuestion.question,
        options: currentQuestion.options
    });
});

// 2. POST /quiz
router.post('/', initQuizSession, (req, res) => {
    if (req.session.quizCompleted) {
        return res.status(400).json({ error: "The quiz is already over. Check the score /quiz/score" });
    }

    const { answer } = req.body;
    const currentIndex = req.session.currentQuestionIndex;

    if (!answer) {
        return res.status(400).json({ error: "You must pass the 'answer' field in the request body" });
    }

    const currentQuestion = triviaQuestions[currentIndex];
    let feedback = "";

    if (answer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
        req.session.score += 1;
        feedback = "Correct!";
    } else {
        feedback = `Incorrect. The correct answer: ${currentQuestion.answer}`;
    }

    req.session.currentQuestionIndex += 1;

    if (req.session.currentQuestionIndex >= triviaQuestions.length) {
        req.session.quizCompleted = true;
        return res.json({
            feedback,
            message: "The quiz is over! Go to /quiz/score to see your result.."
        });
    }

    res.json({
        feedback,
        message: "Response accepted. Make a GET request to /quiz to get the next question."
    });
});

// 3. GET /quiz/score 
router.get('/score', initQuizSession, (req, res) => {
    if (!req.session.quizCompleted && req.session.currentQuestionIndex < triviaQuestions.length) {
        return res.status(400).json({ 
            error: "You haven't finished the quiz yet.", 
            currentQuestion: req.session.currentQuestionIndex + 1 
        });
    }

    const finalScore = req.session.score;
    const totalQuestions = triviaQuestions.length;

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to reset the game" });
        }
        
        res.json({
            message: "Final game result",
            score: `${finalScore} из ${totalQuestions}`
        });
    });
});

module.exports = router;