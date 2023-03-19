import { describe, expect, it, jest } from "@jest/globals";

import { client as pokerGame } from "./client";
import { Events, Message } from "discord.js";

jest.useFakeTimers();

describe("Main tests", () => {
  it("should print game start / welcome message", () => {
    const mockedSend = jest.fn();
    const message = {
      author: { username: "" },
      content: "!start",
      channel: {
        send: mockedSend,
        lastMessage: {
          react: jest.fn(),
        },
      },
    } as unknown;

    pokerGame.emit(Events.MessageCreate, message as Message);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Welcome/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Start/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/> !play/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/You'll/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/\(an/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Stop/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/> !end/);
  });

  it("should print first question message", () => {
    const mockedSend = jest.fn();
    const message = {
      author: { username: "" },
      content: "!play [QUESTION]",
      channel: {
        send: mockedSend,
        lastMessage: {
          react: jest.fn(),
        },
      },
    } as unknown;
    pokerGame.emit(Events.MessageCreate, message as Message);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Current question:/);
  });

  it("should print addition message", () => {
    const mockedSend = jest.fn();
    const message = {
      author: { username: "" },
      content: "!storypoints 3",
      channel: {
        send: mockedSend,
        lastMessage: {
          react: jest.fn(),
        },
      },
    } as unknown;

    pokerGame.emit(Events.MessageCreate, message as Message);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Assigned 3 to the question/);
  });

  it("should print finishing message", () => {
    const mockedSend = jest.fn();
    const message = {
      author: { username: "" },
      content: "!end",
      channel: {
        send: mockedSend,
        lastMessage: {
          react: jest.fn(),
        },
      },
    } as unknown;

    pokerGame.emit(Events.MessageCreate, message as Message);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Planning Poker finished/);
    expect(mockedSend.mock.calls[0][0]).toMatch(
      /Here is an overview of your game:/
    );
    expect(mockedSend.mock.calls[0][0]).toMatch(/Total Story Points: \d{1,}/);
  });
});

describe("aliases", () => {
  it("should print game start / welcome message via alias", () => {
    const mockedSend = jest.fn();
    const message = {
      author: { username: "" },
      content: "!s",
      channel: {
        send: mockedSend,
        lastMessage: {
          react: jest.fn(),
        },
      },
    } as unknown;

    pokerGame.emit(Events.MessageCreate, message as Message);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Welcome/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Start/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/> !play/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/You'll/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/\(an/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Stop/);
    expect(mockedSend.mock.calls[0][0]).toMatch(/> !end/);
  });

  it("should print first question message", () => {
    const mockedSend = jest.fn();
    const message = {
      author: { username: "" },
      content: "!p [QUESTION]",
      channel: {
        send: mockedSend,
        lastMessage: {
          react: jest.fn(),
        },
      },
    } as unknown;

    pokerGame.emit(Events.MessageCreate, message as Message);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Current question:/);
  });

  it("should print addition message via storypoints alias", () => {
    const mockedSend = jest.fn();
    const message = {
      author: { username: "" },
      content: "!sp 10",
      channel: {
        send: mockedSend,
        lastMessage: {
          react: jest.fn(),
        },
      },
    } as unknown;

    pokerGame.emit(Events.MessageCreate, message as Message);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Assigned 10 to the question:/);
  });

  it("should print finishing message", () => {
    const mockedSend = jest.fn();
    const message = {
      author: { username: "" },
      content: "!end",
      channel: {
        send: mockedSend,
        lastMessage: {
          react: jest.fn(),
        },
      },
    } as unknown;

    pokerGame.emit(Events.MessageCreate, message as Message);
    expect(mockedSend.mock.calls[0][0]).toMatch(/Planning Poker finished/);
    expect(mockedSend.mock.calls[0][0]).toMatch(
      /Here is an overview of your game:/
    );
    expect(mockedSend.mock.calls[0][0]).toMatch(/Total Story Points: \d{1,}/);
  });
});
