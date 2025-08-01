const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionText = document.getElementById("question-text");
const optionButtons = document.getElementById("option-buttons");
const questionCount = document.getElementById("question-count");
const finalScore = document.getElementById("final-score");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

let currentQuestion = 0;
let score = 0;

const quizData = [
  {
    question: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "JavaScript", "C++"],
    answer: "CSS",
  },
  {
    question: "Which language runs in the browser?",
    options: ["C", "Java", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "None of the above",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which one is a JavaScript framework?",
    options: ["Django", "Flask", "React", "Laravel"],
    answer: "React",
  }
];

startBtn.onclick = () => {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
};

restartBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  showQuestion();
};

function showQuestion() {
  resetState();
  const q = quizData[currentQuestion];
  questionText.innerText = q.question;
  questionCount.innerText = `Question ${currentQuestion + 1} of ${quizData.length}`;

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.classList.add("option-btn", "option");
    btn.onclick = () => selectAnswer(btn, q.answer);
    optionButtons.appendChild(btn);
  });
}

function resetState() {
  optionButtons.innerHTML = "";
}

function selectAnswer(selectedBtn, correctAnswer) {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  });

  if (selectedBtn.innerText === correctAnswer) {
    score++;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  finalScore.innerText = `You scored ${score} out of ${quizData.length}`;
}
