const Bank = require("../src/bank");

describe("Bank", () => {
  const amountError =
    "That is not a valid amount. Please enter a positive integer.";

  const mockAddTransaction = jest.fn(); 
  const mockformatLog = jest.fn();

  const TransactionLogMock = jest.fn(() => {
    return {
      addTransaction: mockAddTransaction,
      formatLog: mockformatLog,
    };
  });
  // const DateMock = jest.fn((); => {
  //   return {
  //     now: "" 
  // }
  
  const date = new Date(2023, 0, 10, 0, 0, 0, 0);
  let bank = new Bank(TransactionLogMock);

  beforeEach(() => {
    TransactionLogMock.mockClear();
    mockAddTransaction.mockClear();
    mockformatLog.mockClear();
    bank = new Bank(TransactionLogMock);
  });

  describe("initialisation", () => {
    it("creates a new transaction log object", () => {
      expect(TransactionLogMock).toHaveBeenCalled();
    });

    it("begins with balance of zero", () => {
      expect(bank.balance).toBe(0);
    });
  });

  describe("deposit", () => {
    it("should add a credit transaction to the log, with date", () => {
      bank.deposit(1000, date);
      expect(mockAddTransaction).toHaveBeenCalledWith(
        date,
        1000,
        0,
        1000
      );
    });

    it("throws error if given an invalid amount parameter", () => {
      expect(() => {
        bank.deposit(-1000);
      }).toThrowError(new Error(amountError));
    });
  });

  describe("withdraw", () => {
    it("should add a debit transaction to the log, with date", () => {
      bank.deposit(1000, date);
      bank.withdraw(500, date);
      expect(mockAddTransaction.mock.calls.length).toBe(2);
      expect(mockAddTransaction).toHaveBeenCalledWith(date, 0, 500, 500);
    });

    it("throws error if client attempts to withdraw more than their balance", () => {
      expect(() => {
        bank.withdraw(500);
      }).toThrowError(/^Insufficient funds!$/);
    });

    it("throws error if given an invalid amount parameter", () => {
      bank.deposit(1000);
      expect(() => {
        bank.withdraw(12.5);
      }).toThrowError(new Error(amountError));
    });
  });

  describe("statement", () => {
    it("displays/prints statement displaying transaction history, in the required format", () => {
      bank.deposit(1000, new Date(2023, 0, 10, 0, 0, 0, 0));
      bank.deposit(2000, new Date(2023, 0, 12, 0, 0, 0, 0));
      bank.withdraw(500, new Date(2023, 0, 14, 0, 0, 0, 0));
      bank.statement();

      expect(mockformatLog.mock.calls.length).toBe(1);
    });

    it("console.logs the statement returned by TransactionLog's formatLog method, in the required format", () => {
      mockformatLog.mockReturnValueOnce('date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n12/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00'
      );
      console.log = jest.fn()
   
      bank.deposit(1000, new Date(2023, 0, 10, 0, 0, 0, 0));
      bank.deposit(2000, new Date(2023, 0, 12, 0, 0, 0, 0));
      bank.withdraw(500, new Date(2023, 0, 14, 0, 0, 0, 0));

      bank.statement();
      expect(global.console.log).toBeCalledTimes(1)
      expect(global.console.log).toHaveBeenLastCalledWith('date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n12/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00')
    });
  });
});
