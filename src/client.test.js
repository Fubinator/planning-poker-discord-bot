const pokerGame = require("./client");

jest.useFakeTimers();

it("should print welcome message", () => {
  const mockedSend = jest.fn();
  const message = {
    author: { username: "" },
    content: "!start",
    channel: {
      send: mockedSend,
    },
  };
  pokerGame.onMessage(message, 0);
  expect(mockedSend.mock.calls[0][0]).toBe("Welcome to planning poker");
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
  expect(mockedSend.mock.calls[0][0]).toBe("First question: [QUESTION]");
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
  expect(mockedSend.mock.calls[0][0]).toBe(
    "Added 3 to your question [QUESTION]"
  );
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
  expect(mockedSend.mock.calls[0][0]).toBe("Planning Poker finished");
});
