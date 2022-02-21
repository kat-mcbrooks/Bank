const Bank = require('./bank');

describe('Bank', () => {
  const amountError = 'That is not a valid amount. Please enter a positive integer.'
  const dateError = 'That is not a valid date. Please enter date in the format DD-MM-YYYY'

  beforeEach(() => {
    bank = new Bank;
  });
  it('begins with balance of zero', () => {
      expect(bank.balance).toBe(0); 
    });

  it('begins with empty transaction list', () => {
    expect(bank.transactions).toEqual([]); 
  });

  it('client can deposit money on a given date', () => {
    expect(bank.deposit(1000, "10-01-2023")).toEqual("10/01/2023 || 1000.00 || || 1000.00")
  });

  it('client can withdraw money on a given date', () => {
    bank.deposit(1000, "10-01-2023");
    expect(bank.withdraw(500, "14-01-2023")).toEqual("14/01/2023 || || 500.00 || 500.00")
  });

  it('displays/prints statement displaying transaction history, in the required format', () => {
    bank.deposit(1000, "10-01-2023");
    bank.deposit(2000, "13-01-2023");
    bank.withdraw(500, "14-01-2023");
    expect(bank.statement()).toEqual("date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00")
  })

  describe('deposit', () => {
    it('throws error if given an invalid amount parameter', () => {
      expect(() => {
        bank.deposit(-1000, "10-01-2023");
      }).toThrowError(new Error(amountError));
    })
    it('throws error if the date parameter is not a valid format', () => {
      bank.deposit(1000, "10-01-2023");
      expect(() => {
        bank.withdraw(500, "12/12/1991");
      }).toThrowError(new Error(dateError));
    })
  })
  describe('withdraw', () => {
    it('throws error if the date parameter is not a valid format', () => {
      expect(() => {
        bank.withdraw(12.50, "10-01-2023");
      }).toThrowError(new Error(amountError));
    })
    it('throws error if the date parameter is not a valid format', () => {
      expect(() => {
        bank.withdraw(500, "10-01-2023");
      }).toThrowError(/^Insufficient funds!$/);
    })
    it('throws error if the date parameter is not a valid format', () => {
      bank.deposit(1000, "10-01-2023");
      expect(() => {
        bank.withdraw(500, "12 Feb 2019");
      }).toThrowError(new Error(dateError));
    })
  })
  
});