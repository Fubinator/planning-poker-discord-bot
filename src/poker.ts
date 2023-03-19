import { User } from "discord.js";

type Answer = {
  user: User;
  points: number;
};

type Question = {
  question: string;
  answers: Answer[];
  storypoints: number;
};

export class Poker {
  isQuestionRunning: boolean;
  currentAnswers: Answer[];
  currentQuestion: string;
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

  playQuestion(question: string) {
    this.currentQuestion = question;
    this.isQuestionRunning = true;
  }

  addAnswer(user: User, points: number) {
    this.currentAnswers.push({ user, points });
  }

  finishQuestion(storypoints: number) {
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
