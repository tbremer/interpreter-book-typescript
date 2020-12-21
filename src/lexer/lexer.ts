import { Option, Opt } from "std/std";
import { Token, TokenType } from "token/token";

function isLetter(v: Option<string>): boolean {
  return v !== Opt.None && /[a-z_]/i.test(v);
}

function isDigit(v: Option<string>): boolean {
  return v !== Opt.None && /\d/.test(v);
}

function identifierLookup(ident: string): TokenType {
  switch (ident) {
    case "let":
      return TokenType.Let;
    case "fn":
      return TokenType.Function;
    default:
      return TokenType.Ident;
  }
}

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

  skipWhitespace() {
    while (this.ch !== Opt.None && /\s/.test(this.ch)) {
      this.readChar();
    }
  }

  nextToken(): Token {
    let token: Token;

    this.skipWhitespace();

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
      default: {
        if (isLetter(this.ch)) {
          const literal = this.readIdentifier();

          return { literal, type: identifierLookup(literal) };
        } else if (isDigit(this.ch)) {
          const literal = this.readInt();

          return { literal, type: TokenType.Int };
        } else {
          console.log(`else: '${this.ch}'`);
          token = { literal: "", type: TokenType.Illegal };
        }
      }
    }

    this.readChar();

    return token;
  }

  readIdentifier(): string {
    const pos = this.position;

    while (isLetter(this.ch)) {
      this.readChar();
    }

    return this.input.slice(pos, this.position);
  }

  readInt(): string {
    const pos = this.position;

    while (isDigit(this.ch)) {
      this.readChar();
    }

    return this.input.slice(pos, this.position);
  }
}
