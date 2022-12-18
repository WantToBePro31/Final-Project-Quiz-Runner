import { Helper } from "./helper.js";

const helper = new Helper();

export class Quiz {
    constructor() {
        this.quizContainer = document.getElementById("quiz-container");
        this.quizTime = document.getElementById("quiz-time");
        this.quizQuestion = document.getElementById("quiz-question");

        this.remainingTime = 10;
        this.answer = 0;

        // default values
        this.description = "Test Quiz";
        this.keyAnswer = 1;
    } 
    updateRemainingTime() {
        this.remainingTime--;
        this.quizTime.innerHTML = this.remainingTime;
        return this.remainingTime <= 0 ? 1 : 0;
    }
    filledAnswer() {
        return this.answer ? 1 : 0;
    }
    checkAnswer() {
        return this.answer === this.keyAnswer;
    }
    closeQuiz() {
        this.quizContainer.style.display = "none";
    }
    init() {
        this.quizQuestion.innerHTML = this.description;
        this.quizContainer.style.display = "block";
        this.quizTime.innerHTML = this.remainingTime;
    }
}
