const start = document.querySelector('.start')
const next = document.querySelector('.next')
const first = document.querySelector('.first')
const quizWrapper = document.querySelector('.quizWrapper')
const questionText = document.querySelector('.question')
const answers = document.querySelector('.answers')
const btn = document.querySelector('.btn')
const category = document.querySelector('#category')
const limit = document.querySelector('#Limit')
const difficulty = document.querySelector('#Difficulty')
const restart = document.querySelector('.restart')
const score = document.querySelector('.score')
const scoreWrapper = document.querySelector('.scoreWrapper')

let questions = []
let answerBtnArr = []
let currentQuestion
let scoreCount = 0
let correctAnswer 
let num=1

window.addEventListener('load', () => {
    scoreWrapper.classList.add('none')
    first.classList.remove('none')
    quizWrapper.classList.add('none')
})

const fetchQuestion = async () => {
    await fetch(`https://opentdb.com/api.php?amount=${limit.value}&category=${category.value}&difficulty=${difficulty.value}&type=multiple`)
        .then(res => res.json())
        .then(data => {
            questions = data.results
            first.classList.add('none')
            quizWrapper.classList.remove('none')
           

            currentQuestion = 1
            showQuestion(questions[currentQuestion - 1])
        }
        )
}
start.addEventListener('click', fetchQuestion)

const showQuestion = (question) => {
    
    questionText.innerHTML =`${num}.${question.question}` 
    num++
    answerBtnArr = [...question.incorrect_answers, question.correct_answer.toString()]
    answerBtnArr.sort(() => Math.random() - 0.5)
    correctAnswer = question.correct_answer
    answers.innerHTML = ""
    answerBtnArr.forEach(answer => {
        answers.insertAdjacentHTML("beforeend", `
            <button class="btn" onClick =optionSelected(this)  >${answer}</button>
            `)
        })
        
       
}
const optionSelected = (answer) => {

    if (answer.innerHTML === correctAnswer) {
        answer.classList.add('correct')
        scoreCount++
    } else {
        answer.classList.add('wrong')
    }
}

next.addEventListener('click', () => {
    nextQuestion()
})

const nextQuestion = () => {
    if (currentQuestion < questions.length) {
        currentQuestion++;
        showQuestion(questions[currentQuestion - 1]);
    }
    else {
        quizWrapper.classList.add('none')
        scoreWrapper.classList.remove('none')
        showScore()
    }
}

restart.addEventListener('click', () => {
    num = 1
    scoreCount = 0
    first.classList.remove('none')
    scoreWrapper.classList.add('none')
}
)

const showScore = () => {
    const state = document.querySelector('.state')
    if (scoreCount < (limit.value / 2)) {
        state.innerHTML = `Oops!!!`
    }
    else {
        state.innerHTML = `Congratulations!`
    }
    score.innerHTML = ` ${scoreCount}/${limit.value}`
}
