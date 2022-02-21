const Bank = require('./bank');

describe('Bank', () => {
  it('begins with balance of zero', () => {
      bank = new Bank;
      expect(bank.balance).toBe(0); 
    });

  it('begins with empty transaction list', () => {
    bank = new Bank;
    expect(bank.transactions).toEqual([]); 
  });
  it('client can deposit money on a given date', () => {
    bank = new Bank;
    expect(bank.deposit(1000, "10/01/2023")).toEqual("10/01/2023 || 1000.00 || || 1000.00")
  });

  it('client can withdraw money on a given date', () => {
    bank = new Bank;
    bank.deposit(1000, "10/01/2023");
    expect(bank.withdraw(500, "14/01/2023")).toEqual("14/01/2023 || || 500.00 || 500.00")
  });


  
});