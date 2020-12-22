import Lexer from "lexer/lexer";
import { Token, TokenType } from "token/token";

describe("lexer", () => {
  it("parses symbols correctly", () => {
    describe("nextToken", () => {
      const input = "=+(){},;";
      const expectations: Token[] = [
        { literal: "=", type: TokenType.Assign },
        { literal: "+", type: TokenType.Plus },
        { literal: "(", type: TokenType.LParen },
        { literal: ")", type: TokenType.RParen },
        { literal: "{", type: TokenType.LBrace },
        { literal: "}", type: TokenType.RBrace },
        { literal: ",", type: TokenType.Comma },
        { literal: ";", type: TokenType.Semicolon },
        { literal: "", type: TokenType.EOF }
      ];
      const lexer = new Lexer(input);

      for (const expected of expectations) {
        expect(lexer.nextToken()).toStrictEqual(expected);
      }
    });
  });

  it("parses small programs", () => {
    const input = `let five = 5;
    let ten = 10;
    
    let add = fn(x,y) { x + y };
    
    let result = add(five, ten);
    !-/*5;
    5 < 10 > 5;

    if (5 < 10) {
      return true;
    } else {
      return false;
    }
    `;
    let expectations: Array<[string, TokenType]> = [
      ["let", TokenType.Let],
      ["five", TokenType.Ident],
      ["=", TokenType.Assign],
      ["5", TokenType.Int],
      [";", TokenType.Semicolon],
      ["let", TokenType.Let],
      ["ten", TokenType.Ident],
      ["=", TokenType.Assign],
      ["10", TokenType.Int],
      [";", TokenType.Semicolon],
      ["let", TokenType.Let],
      ["add", TokenType.Ident],
      ["=", TokenType.Assign],
      ["fn", TokenType.Function],
      ["(", TokenType.LParen],
      ["x", TokenType.Ident],
      [",", TokenType.Comma],
      ["y", TokenType.Ident],
      [")", TokenType.RParen],
      ["{", TokenType.LBrace],
      ["x", TokenType.Ident],
      ["+", TokenType.Plus],
      ["y", TokenType.Ident],
      ["}", TokenType.RBrace],
      [";", TokenType.Semicolon],
      ["let", TokenType.Let],
      ["result", TokenType.Ident],
      ["=", TokenType.Assign],
      ["add", TokenType.Ident],
      ["(", TokenType.LParen],
      ["five", TokenType.Ident],
      [",", TokenType.Comma],
      ["ten", TokenType.Ident],
      [")", TokenType.RParen],
      [";", TokenType.Semicolon],
      ["!", TokenType.Bang],
      ["-", TokenType.Minus],
      ["/", TokenType.Slash],
      ["*", TokenType.Asterisk],
      ["5", TokenType.Int],
      [";", TokenType.Semicolon],
      ["5", TokenType.Int],
      ["<", TokenType.LessThan],
      ["10", TokenType.Int],
      [">", TokenType.GreaterThan],
      ["5", TokenType.Int],
      [";", TokenType.Semicolon],
      ["if", TokenType.If],
      ["(", TokenType.LParen],
      ["5", TokenType.Int],
      ["<", TokenType.LessThan],
      ["10", TokenType.Int],
      [")", TokenType.RParen],
      ["{", TokenType.LBrace],
      ["return", TokenType.Return],
      ["true", TokenType.True],
      [";", TokenType.Semicolon],
      ["}", TokenType.RBrace],
      ["else", TokenType.Else],
      ["{", TokenType.LBrace],
      ["return", TokenType.Return],
      ["false", TokenType.False],
      [";", TokenType.Semicolon],
      ["}", TokenType.RBrace],
      ["", TokenType.EOF]
    ];

    const lexer = new Lexer(input);

    for (const [literal, type] of expectations) {
      expect(lexer.nextToken()).toStrictEqual({ literal, type });
    }
  });
});
