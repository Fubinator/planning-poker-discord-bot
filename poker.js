const Poker = {
  questionRunning: false,
  currentAnswers: [],
  currentQuestion: undefined,
  questions: [],

  playQuestion(question) {
    this.currentQuestion = question;
    this.questionRunning = true;
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
    this.questionRunning = false;
  },

  finishGame() {
    this.questions = [];
  },
};

module.exports = Poker;
