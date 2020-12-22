export interface Token {
  type: TokenType;
  literal: string;
}

export enum TokenType {
  Illegal = "Illegal",
  EOF = "EOF",
  Ident = "Ident", // x, y, foo, bar
  Int = "Int", // 1,2,44
  
  // Operators
  Assign = "Assign", // =
  Plus = "Plus",
  Minus = "Minus",
  Bang = "Bang",
  Asterisk = "Asterisk",
  Slash = "Slash",
  LessThan = "LessThan",
  GreaterThan = "GreaterTahn",

  Comma = "Comma",
  Semicolon = "Semicolon",
  LParen = "LParen",
  RParen = "RParen",
  LBrace = "LBrace",
  RBrace = "RBrace",
  Function = "Function",
  Let = "Let"
}
