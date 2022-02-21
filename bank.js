class Bank {
  constructor() {
    this.balance = 0
  }
  
  deposit(amount, date) {
    this.balance += amount;
    return `${date} || ${amount.toFixed(2)} || || ${this.balance.toFixed(2)}`;
  }
}
module.exports = Bank; 