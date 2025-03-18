const questions = {
    mind: [
        { question: "What is 5 + 3?", options: ["5", "8", "10"], answer: "8" },
        { question: "What comes next? 2, 4, 6, ?", options: ["7", "8", "10"], answer: "8" },
        { question: "Which is the odd one out? Apple, Banana, Carrot", options: ["Apple", "Banana", "Carrot"], answer: "Carrot" }
    ],
    physical: [
        { question: "How many bones are in the human body?", options: ["206", "201", "210"], answer: "206" },
        { question: "Which is the strongest muscle in the human body?", options: ["Heart", "Jaw", "Leg"], answer: "Jaw" },
        { question: "What is the normal resting heart rate?", options: ["60-100 BPM", "40-50 BPM", "110-150 BPM"], answer: "60-100 BPM" }
    ],
    general: [
        { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Tolkien"], answer: "Shakespeare" },
        { question: "What is the capital of France?", options: ["Berlin", "Paris", "London"], answer: "Paris" },
        { question: "Which planet is closest to the sun?", options: ["Earth", "Venus", "Mercury"], answer: "Mercury" }
    ]
};

let selectedAnswers = {};
let correctAnswers = 0;

function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = "";

    let selectedQuestions = [
        ...questions.mind.sort(() => 0.5 - Math.random()).slice(0, 3),
        ...questions.physical.sort(() => 0.5 - Math.random()).slice(0, 3),
        ...questions.general.sort(() => 0.5 - Math.random()).slice(0, 3)
    ];

    selectedQuestions.forEach((q, index) => {
        let questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
        
        q.options.forEach(option => {
            let btn = document.createElement("button");
            btn.innerText = option;
            btn.onclick = () => selectAnswer(index, option, btn);
            questionDiv.appendChild(btn);
        });

        quizContainer.appendChild(questionDiv);
    });
}

function selectAnswer(index, answer, button) {
    selectedAnswers[index] = answer;
    
    // Change button color
    let buttons = button.parentNode.getElementsByTagName("button");
    for (let btn of buttons) {
        btn.classList.remove("selected");
    }
    button.classList.add("selected");
}

function checkResults() {
    correctAnswers = 0;
    let i = 0;
    
    [...questions.mind, ...questions.physical, ...questions.general].forEach(q => {
        if (selectedAnswers[i] === q.answer) {
            correctAnswers++;
        }
        i++;
    });

    let resultText = "";
    if (correctAnswers === 10) {
        resultText = "🎉 Congratulations! You answered all correctly!";
    } else if (correctAnswers >= 8) {
        resultText = "✅ Good Job! You got " + correctAnswers + " right.";
    } else if (correctAnswers >= 4) {
        resultText = "⚠️ Not bad, but you need improvement! Score: " + correctAnswers;
    } else if (correctAnswers >= 1) {
        resultText = "❌ Bad! Score: " + correctAnswers;
    } else {
        resultText = "💀 Very worst! You got 0 correct.";
    }

    document.getElementById("result").innerText = resultText;
}

loadQuiz();
