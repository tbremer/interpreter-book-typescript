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
});
