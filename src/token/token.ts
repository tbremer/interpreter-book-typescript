export interface Token {
  type: TokenType;
  literal: string;
}

export enum TokenType {
  Illegal = "Illegal",
  EOF = "EOF",
  Ident = "Ident", // x, y, foo, bar
  Int = "Int", // 1,2,44
  Assign = "Assign", // =
  Plus = "Plus",
  Comma = "Comma",
  Semicolon = "Semicolon",
  LParen = "LParen",
  RParen = "RParen",
  LBrace = "LBrace",
  RBrace = "RBrace",
  Function = "Function",
  Let = "Let"
}
