import { User } from "discord.js";

type Answer = {
  user: User;
  points: Number;
};

type Question = {
  question: String;
  answers: Answer[];
  storypoints: Number;
};

export class Poker {
  isQuestionRunning: boolean;
  currentAnswers: Answer[];
  currentQuestion: String;
  questions: Question[];
  users: User[];

  constructor() {
    this.isQuestionRunning = false;
    this.currentAnswers = [];
    this.currentQuestion = "";
    this.questions = [];
    this.users = [];
  }

  addUser(user: User) {
    this.users.push(user);
  }

  removeUser(user: User) {
    this.users = this.users.filter((usr) => usr !== user);
  }

  playQuestion(question: String) {
    this.currentQuestion = question;
    this.isQuestionRunning = true;
  }

  addAnswer(user: User, points: Number) {
    this.currentAnswers.push({ user, points });
  }

  finishQuestion(storypoints: Number) {
    this.questions.push({
      question: this.currentQuestion,
      answers: this.currentAnswers,
      storypoints,
    });
    this.currentQuestion = "";
    this.currentAnswers = [];
    this.isQuestionRunning = false;
  }

  finishGame() {
    this.questions = [];
  }
}
