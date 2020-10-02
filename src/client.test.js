const pokerGame = require("./client");

jest.useFakeTimers();

it("should print game start / welcome message", () => {
  const mockedSend = jest.fn();
  const message = {
    author: { username: "" },
    content: "!start",
    channel: {
      send: mockedSend,
    },
  };
  pokerGame.onMessage(message, 0);
  expect(mockedSend.mock.calls[0][0]).toMatch(/Welcome/);
  expect(mockedSend.mock.calls[0][0]).toMatch(/Please/);
  expect(mockedSend.mock.calls[0][0]).toMatch(/30 seconds/);
  expect(mockedSend.mock.calls[0][0]).toMatch(/stop playing/);
});

it("should print first question message", () => {
  const mockedSend = jest.fn();
  const message = {
    author: { username: "" },
    content: "!play [QUESTION]",
    channel: {
      send: mockedSend,
    },
  };
  pokerGame.onMessage(message, 0);
  expect(mockedSend.mock.calls[0][0]).toMatch(/First question:/);
});

it("should print addition message", () => {
  const mockedSend = jest.fn();
  const message = {
    author: { username: "" },
    content: "!storypoints 3",
    channel: {
      send: mockedSend,
    },
  };
  pokerGame.onMessage(message, 0);
  expect(mockedSend.mock.calls[0][0]).toMatch(/Added 3 to your question/);
});

it("should print finishing message", () => {
  const mockedSend = jest.fn();
  const message = {
    author: { username: "" },
    content: "!end",
    channel: {
      send: mockedSend,
    },
  };
  pokerGame.onMessage(message, 0);
  expect(mockedSend.mock.calls[0][0]).toMatch(/Planning Poker finished/);
  expect(mockedSend.mock.calls[0][0]).toMatch(
    /Here is an overview of your game:/
  );
  expect(mockedSend.mock.calls[0][0]).toMatch(/Total Story Points: \d{1,}/);
});
