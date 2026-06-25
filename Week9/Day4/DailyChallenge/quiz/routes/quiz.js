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
        return res.status(400).json({ error: "Викторина уже завершена. Проверьте счет на /quiz/score" });
    }

    const { answer } = req.body;
    const currentIndex = req.session.currentQuestionIndex;

    if (!answer) {
        return res.status(400).json({ error: "Необходимо передать поле 'answer' в теле запроса" });
    }

    const currentQuestion = triviaQuestions[currentIndex];
    let feedback = "";

    if (answer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
        req.session.score += 1;
        feedback = "Правильно!";
    } else {
        feedback = `Неверно. Правильный ответ: ${currentQuestion.answer}`;
    }

    req.session.currentQuestionIndex += 1;

    if (req.session.currentQuestionIndex >= triviaQuestions.length) {
        req.session.quizCompleted = true;
        return res.json({
            feedback,
            message: "Викторина окончена! Перейдите на /quiz/score, чтобы узнать результат."
        });
    }

    res.json({
        feedback,
        message: "Ответ принят. Сделайте GET-запрос на /quiz, чтобы получить следующий вопрос."
    });
});

// 3. GET /quiz/score 
router.get('/score', initQuizSession, (req, res) => {
    if (!req.session.quizCompleted && req.session.currentQuestionIndex < triviaQuestions.length) {
        return res.status(400).json({ 
            error: "Вы еще не закончили викторину", 
            currentQuestion: req.session.currentQuestionIndex + 1 
        });
    }

    const finalScore = req.session.score;
    const totalQuestions = triviaQuestions.length;

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Не удалось сбросить игру" });
        }
        
        res.json({
            message: "Финальный результат игры",
            score: `${finalScore} из ${totalQuestions}`
        });
    });
});

module.exports = router;