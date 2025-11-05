import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 1, b: 2, action: Action.Add };
    const result = simpleCalculator(input);
    expect(result).toBe(3);
  });

  test('should subtract two numbers', () => {
    const input = { a: 3, b: 2, action: Action.Subtract };
    const result = simpleCalculator(input);
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Multiply };
    const result = simpleCalculator(input);
    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const input = { a: 6, b: 3, action: Action.Divide };
    const result = simpleCalculator(input);
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate };
    const result = simpleCalculator(input);
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const inputInvalidAction = { a: 1, b: 2, action: 3 };
    const result = simpleCalculator(inputInvalidAction);
    expect(result).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    const inputInvalidA = { a: '1', b: 2, action: Action.Add };
    const inputInvalidB = { a: 1, b: '2', action: Action.Add };
    const inputInvalidBoth = { a: '1', b: '2', action: Action.Add };
    const resultA = simpleCalculator(inputInvalidA);
    const resultB = simpleCalculator(inputInvalidB);
    const resultBoth = simpleCalculator(inputInvalidBoth);
    expect(resultA).toBeNull;
    expect(resultB).toBeNull;
    expect(resultBoth).toBeNull;
  });
});
