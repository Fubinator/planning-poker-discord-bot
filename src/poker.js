class Poker {
  constructor() {
    this.isQuestionRunning = false;
    this.currentAnswers = [];
    this.currentQuestion = undefined;
    this.questions = [];
    this.users = [];
  }

  addUser(userId) {
    this.users.push(userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user !== userId);
  }

  playQuestion(question) {
    this.currentQuestion = question;
    this.isQuestionRunning = true;
  }

  addAnswer(user, points) {
    this.currentAnswers.push({ user, points });
  }

  finishQuestion(storypoints) {
    this.questions.push({
      question: this.currentQuestion,
      answers: this.currentAnswers,
      storypoints,
    });
    this.currentQuestion = undefined;
    this.currentAnswers = [];
    this.isQuestionRunning = false;
  }

  finishGame() {
    this.questions = [];
  }
}

module.exports = Poker;
