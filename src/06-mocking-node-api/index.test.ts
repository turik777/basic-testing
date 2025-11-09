import { doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const time = 1000;
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, time);
    expect(spy).toHaveBeenCalledWith(callback, time);
    spy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const time = 1000;
    doStuffByTimeout(callback, time);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const time = 1000;
    const spy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, time);
    expect(spy).toHaveBeenCalledWith(callback, time);
    spy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const time = 1000;
    const callsNumber = 3;
    doStuffByInterval(callback, time);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(time * callsNumber);
    expect(callback).toHaveBeenCalledTimes(callsNumber);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // Write your test here
  });

  test('should return null if file does not exist', async () => {
    // Write your test here
  });

  test('should return file content if file exists', async () => {
    // Write your test here
  });
});
