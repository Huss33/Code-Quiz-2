const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const timerEl = document.getElementById("timer");
var timer = 75;

const questionContainerEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-btn');
let shuffledQuestions 
let questionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    questionIndex++
    setNextQuestion()
})


const questions = [
    {
      question: "Commonly used data types DO NOT inclued:",
      answers: [
        { text: "Strings", correct: false},
        { text: "Booleans", correct: false},
        { text: "Alerts", correct: true},
        { text: "Numbers", correct: false},    
      ]
    },
    {
      question: "The condition in an if/else statement is enclosed within ______.",
      answers: [
        { text: "Quotes", correct: false},
        { text: "Curly Brackets", correct: true},
        { text: "Parentheses", correct: false},
        { text: "Square Brackets", correct: false},    
      ]
    },
    {
      question: "Arrays in JavaScript can be used to store _____.",
      answers: [
        { text: "Numbers and Strings", correct: false},
        { text: "Other Arrays", correct: false},
        { text: "Booleans", correct: false},
        { text: "All of the Above", correct: true},    
      ]
    },
    {
      question: "String values must be enclosed within _____ when being assigned to variables.",
      answers: [
        { text: "Commas", correct: false},
        { text: "Curly Brackets", correct: false},
        { text: "Quotes", correct: true},
        { text: "Parentheses", correct: false},    
      ]
    },
    {
      question: "A very useful tool used during development and debugging for printing content to the debugger is _____.",
      answers: [
        { text: "JavaScript", correct: false},
        { text: "Terminal/Bash", correct: false},
        { text: "For Loops", correct: false},
        { text: "Console Log", correct: true},    
      ]
    },
]

function startGame() {
    console.log('Started');
    startButton.classList.add('hidden')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    questionIndex = 0
    questionContainerEl.classList.remove('hidden')
    var interval = setInterval(function() {
      timer--;
      timerEl.textContent = timer;
      if (timer === 0) {        
        clearInterval(interval);
        console.log(timer);
    }
  }, 1000);
    setNextQuestion()
}


function displayQuestion(question) {
  questionEl.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsEl.appendChild(button)
  });
}

function setNextQuestion() {
    resetState()
    displayQuestion(shuffledQuestions[questionIndex])
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hidden')
    while (answerButtonsEl.firstChild) {
      answerButtonsEl.removeChild
        (answerButtonsEl.firstChild)
    }
}

function selectAnswer(e) {
    const buttonSelect = e.target
    const correct = buttonSelect.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > questionIndex + 1) {
        nextButton.classList.remove('hidden')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hidden')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}