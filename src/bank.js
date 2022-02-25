const TransactionLog = require("./transaction_log");

class Bank {
  constructor(log = TransactionLog) {
    this.balance = 0;
    this.transactionLog = new log();
  }

  deposit(num, date = new Date) {
    const amount = this._validate(num);
    this.balance += amount;
    this.transactionLog.addTransaction(date, amount, 0, this.balance);
    return `You have made a deposit of £${amount.toFixed(2)}. Your balance is now ${this.balance.toFixed(2)}`;
  }

  withdraw(num, date = new Date()) {
    const amount = this._validate(num);
    this._checkFunds(amount);
    this.balance -= amount;
    this.transactionLog.addTransaction(date, 0, amount, this.balance);
    return `You have made a withdrawal of £${amount.toFixed(2)}. Your balance is now ${this.balance.toFixed(2)}`;
  }

  statement() {
    console.log(this.transactionLog.formatLog());
  }

  _validate(amount) {
    if (!Number.isInteger(amount) || amount < 0) {
      throw "That is not a valid amount. Please enter a positive integer.";
    }
    return amount;
  }



  _checkFunds(amount) {
    if (this.balance < amount) {
      throw "Insufficient funds!";
    }
  }
}
module.exports = Bank;
