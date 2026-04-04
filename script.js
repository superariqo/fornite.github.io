let signs = ['+', '-', '*', '/']


let container_main = document.querySelector('.main')
let container_start = document.querySelector('.start')
let container_start_h3 = container_start.querySelector('h3')


let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let start_button = document.querySelector('.start-btn')


function randint(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


function getRandomSign() {
    return signs[randint(0, signs.length - 1)]
}


function shuffle(array) {
    let currentIndex = array.length
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] =
        [array[randomIndex], array[currentIndex]]
    }
    return array
}


// ====== QUESTION CLASS ======
class Question {
    constructor() {
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSign()


        // Hindari pembagian desimal
        if (sign === '/') {
            a = a * b
        }


        this.question = `${a} ${sign} ${b}`


        if (sign === '+') this.correct = a + b
        else if (sign === '-') this.correct = a - b
        else if (sign === '*') this.correct = a * b
        else if (sign === '/') this.correct = a / b


        this.answers = [
            this.correct,
            randint(this.correct - 10, this.correct - 1),
            randint(this.correct - 10, this.correct - 1),
            randint(this.correct + 1, this.correct + 10),
            randint(this.correct + 1, this.correct + 10),
        ]


        shuffle(this.answers)
    }


    display() {
        question_field.innerHTML = this.question
        for (let i = 0; i < answer_buttons.length; i++) {
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}


// ====== GAME STATE ======
let current_question
let correct_answers_given = 0
let total_answers_given = 0
let game_timer


// ====== START GAME ======
start_button.addEventListener('click', function () {
    container_main.style.display = 'flex'
    container_start.style.display = 'none'


    correct_answers_given = 0
    total_answers_given = 0


    current_question = new Question()
    current_question.display()


    game_timer = setTimeout(endGame, 10000) // 10 detik
})


// ====== END GAME ======
function endGame() {
    container_main.style.display = 'none'
    container_start.style.display = 'flex'


    let accuracy = total_answers_given === 0
        ? 0
        : Math.round((correct_answers_given * 100) / total_answers_given)


    container_start_h3.innerHTML =
        `You have given ${correct_answers_given} correct answers out of ${total_answers_given}.
        Accuracy is ${accuracy}%.`
}


// ====== ANSWER CLICK ======
for (let i = 0; i < answer_buttons.length; i++) {
    answer_buttons[i].addEventListener('click', function () {
        let chosen = Number(answer_buttons[i].innerHTML)


        if (chosen === current_question.correct) {
            correct_answers_given++
            answer_buttons[i].style.background = '#00FF00'
        } else {
            answer_buttons[i].style.background = '#FF0000'
        }


        anime({
            targets: answer_buttons[i],
            background: '#FFFFFF',
            duration: 500,
            easing: 'linear'
        })


        total_answers_given++


        current_question = new Question()
        current_question.display()
    })
}
