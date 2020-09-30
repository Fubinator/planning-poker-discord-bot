const Poker = {
  isQuestionRunning: false,
  currentAnswers: [],
  currentQuestion: undefined,
  questions: [],

  playQuestion(question) {
    this.currentQuestion = question;
    this.isQuestionRunning = true;
  },

  addAnswer(user, points) {
    this.currentAnswers.push({ user, points });
  },

  finishQuestion(storypoints) {
    this.questions.push({
      question: this.currentQuestion,
      answers: this.currentAnswers,
      storypoints,
    });
    this.currentQuestion = undefined;
    this.currentAnswers = [];
    this.isQuestionRunning = false;
  },

  finishGame() {
    this.questions = [];
  },
};

module.exports = Poker;
