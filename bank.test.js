const Bank = require('./bank');

describe('Bank', () => {
  const amountError = 'That is not a valid amount. Please enter a positive integer.'
  
  describe('initialisation', () => {
    const TransactionLogMock = jest.fn();
    const bank = new Bank(TransactionLogMock);

    it('creates a new transaction log object', () => {
      expect(TransactionLogMock).toHaveBeenCalled()
    })

    it('begins with balance of zero', () => {
      expect(bank.balance).toBe(0); 
    });
  });

  describe('deposit', () => {
    const mockAddCredit = jest.fn();
    const TransactionLogMock = jest.fn(() => {
      return {
        addCredit: mockAddCredit
      }
    });
    date = new Date
    bank = new Bank(TransactionLogMock);
      
    it('should add a credit transaction to the log, with date', () => {
      bank.deposit(1000, date);
      expect(mockAddCredit).toHaveBeenCalledWith(bank._format(date), 1000, 1000)
    });
    
    it('throws error if given an invalid amount parameter', () => {
      expect(() => {
        bank.deposit(-1000);
      }).toThrowError(new Error(amountError));
    });
  })

  describe('withdraw', () => {
    const mockAddCredit = jest.fn();
    const mockAddDebit = jest.fn();
    const TransactionLogMock = jest.fn(() => {
      return {
        addDebit: mockAddDebit,
        addCredit: mockAddCredit
      };
    });
    const date = new Date
    const bank = new Bank(TransactionLogMock);

    it('should add a debit transaction to the log, with date', () => {
      bank.deposit(1000, date);
      bank.withdraw(500, date);
      expect(mockAddDebit.mock.calls.length).toBe(1);
      expect(mockAddDebit).toHaveBeenCalledWith(bank._format(date), 500, 500)
    })

    it('throws error if client attempts to withdraw more than their balance', () => {
      bank.balance = 0 
      expect(() => {
        bank.withdraw(500);
      }).toThrowError(/^Insufficient funds!$/);
    })

    it('throws error if given an invalid amount parameter', () => {
      bank.deposit(1000);
      expect(() => {
        bank.withdraw(12.50);
      }).toThrowError(new Error(amountError));
    })  
  })

  describe('statement', () => {
    const mockAddCredit = jest.fn();
    const mockAddDebit = jest.fn();
    const mockformatTransactions = jest.fn();
    const TransactionLogMock = jest.fn(() => {
      return {
        addDebit: mockAddDebit,
        addCredit: mockAddCredit,
        formatTransactions: mockformatTransactions
      };
    });

    const date = new Date
    const bank = new Bank(TransactionLogMock);
    
    it('displays/prints statement displaying transaction history, in the required format', () => {
      bank.deposit(1000, new Date(2023, 0, 10, 0, 0, 0, 0));
      bank.deposit(2000, new Date(2023, 0, 12, 0, 0, 0, 0));
      bank.withdraw(500, new Date(2023, 0, 14, 0, 0, 0, 0));
      bank.statement();
      expect(mockformatTransactions.mock.calls.length).toBe(1);
  })
  })

});