const Bank = require('./bank');

describe('Bank', () => {
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
    expect(bank.deposit(1000, "10/01/2023")).toEqual("10/01/2023 || 1000.00 || || 1000.00")
  });

  it('client can withdraw money on a given date', () => {
    bank.deposit(1000, "10/01/2023");
    expect(bank.withdraw(500, "14/01/2023")).toEqual("14/01/2023 || || 500.00 || 500.00")
  });

  it('displays/prints statement displaying transaction history, in the required format', () => {
    bank.deposit(1000, "10/01/2023");
    bank.deposit(2000, "13/01/2023");
    bank.withdraw(500, "14/01/2023");
    expect(bank.statement()).toEqual("date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n13/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00")
  })
  
});