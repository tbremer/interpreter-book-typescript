export interface Token {
  type: TokenType;
  literal: string;
}

export enum TokenType {
  Illegal,
  EOF,
  Ident, // x, y, foo, bar
  Int, // 1,2,44
  Assign, // =
  Plus,
  Comma,
  Semicolon,
  LParen,
  RParen,
  LBrace,
  RBrace,
  Function,
  Let
}
