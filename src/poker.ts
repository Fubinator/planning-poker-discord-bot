import { TextBasedChannel, User } from "discord.js";

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
  timer?: NodeJS.Timeout;
  gameChannel?: TextBasedChannel;

  constructor(gameChannel:TextBasedChannel) {
    this.isQuestionRunning = false;
    this.currentAnswers = [];
    this.currentQuestion = "";
    this.questions = [];
    this.users = [];
    this.gameChannel = gameChannel;
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

  saveQuestionTimer(timer: NodeJS.Timeout) {
    this.timer = timer;
  }

  cancelQuestionTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
  }

  addAnswer(user: User, points: number) {
    this.currentAnswers.push({ user, points });
  }

  allAlswersReceived(): boolean {
    return this.currentAnswers.length === this.users.filter(u=>!u.bot).length;
  }

  collectAnswers(): string[] {
    return this.currentAnswers.map((answer) => `${answer.user} estimated: ${answer.points}`);
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
