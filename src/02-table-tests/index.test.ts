import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Subtract, expected: 3 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 3, b: 4, action: Action.Multiply, expected: 12 },
  { a: 4, b: 5, action: Action.Multiply, expected: 20 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 12, b: 4, action: Action.Divide, expected: 3 },
  { a: 20, b: 5, action: Action.Divide, expected: 4 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: 4, b: 5, action: Action.Exponentiate, expected: 1024 },
  { a: 1, b: 2, action: 3, expected: null },
  { a: 1, b: 2, action: '3', expected: null },
  { a: 1, b: 2, action: [3], expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 1, b: '2', action: Action.Add, expected: null },
  { a: '1', b: '2', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should perform the correct calculation for valid inputs and return null for invalid inputs',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
