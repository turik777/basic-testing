import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const initialBalance = 100;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.withdraw(initialBalance + 1)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    const transferBankAccount = getBankAccount(0);
    expect(() =>
      bankAccount.transfer(initialBalance + 1, transferBankAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.transfer(initialBalance, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const deposit = 100;
    const bankAccount = getBankAccount(0);
    bankAccount.deposit(deposit);
    expect(bankAccount.getBalance()).toBe(deposit);
  });

  test('should withdraw money', () => {
    const withdraw = 25;
    const bankAccount = getBankAccount(initialBalance);
    bankAccount.withdraw(withdraw);
    expect(bankAccount.getBalance()).toBe(initialBalance - withdraw);
  });

  test('should transfer money', () => {
    const transfer = 25;
    const bankAccount = getBankAccount(initialBalance);
    const transferBankAccount = getBankAccount(0);
    bankAccount.transfer(transfer, transferBankAccount);
    expect(bankAccount.getBalance()).toBe(initialBalance - transfer);
    expect(transferBankAccount.getBalance()).toBe(transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockBalance = 25;
    const bankAccount = getBankAccount(initialBalance);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(mockBalance);
    const balance = await bankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 25;
    const bankAccount = getBankAccount(initialBalance);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(mockBalance);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(initialBalance);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValue(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
