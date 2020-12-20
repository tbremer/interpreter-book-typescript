import { Option, Opt } from "std/std";
import { Token, TokenType } from "token/token";

interface Lexer {
  input: string;
  position: number; // current `ch` index
  readPosition: number; // next position in input
  ch: Option<string>;
}

export default class implements Lexer {
  input: string;
  position: number;
  readPosition: number;
  ch: Option<string>;

  constructor(str: string) {
    this.input = str;
    this.position = 0;
    this.readPosition = 0;
    this.ch = Opt.None;

    this.readChar();
  }

  readChar() {
    if (this.readPosition >= this.input.length) {
      this.ch = Opt.None;
      return;
    }

    this.ch = this.input[this.readPosition];
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  nextToken(): Token {
    let token: Token;

    switch (this.ch) {
      case "=": {
        token = { literal: this.ch, type: TokenType.Assign };
        break;
      }
      case ";": {
        token = { literal: this.ch, type: TokenType.Semicolon };
        break;
      }
      case "(": {
        token = { literal: this.ch, type: TokenType.LParen };
        break;
      }
      case ")": {
        token = { literal: this.ch, type: TokenType.RParen };
        break;
      }
      case ",": {
        token = { literal: this.ch, type: TokenType.Comma };
        break;
      }
      case "+": {
        token = { literal: this.ch, type: TokenType.Plus };
        break;
      }
      case "{": {
        token = { literal: this.ch, type: TokenType.LBrace };
        break;
      }
      case "}": {
        token = { literal: this.ch, type: TokenType.RBrace };
        break;
      }
      case Opt.None: {
        token = { literal: "", type: TokenType.EOF };
        break;
      }
      default:
        token = { literal: "", type: TokenType.Illegal };
    }

    this.readChar();

    return token;
  }
}
