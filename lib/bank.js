const TransactionLog = require('../lib/transaction_log');

class Bank {
  constructor(log = TransactionLog) {
    this.balance = 0
    this.transactionLog = new log
  }
  
  deposit(num, today = new Date) {
    const amount = this._isValid(num);
    const date = this._format(today);
    this.balance += amount;
    
    this.transactionLog.addCredit(date, amount, this.balance);
    return `You have made a deposit of £${amount.toFixed(2)}. Your balance is now ${this.balance.toFixed(2)}`;
  }

  withdraw(num, today = new Date) {
    const amount = this._isValid(num);
    this._checkFunds(amount);
    const date = this._format(today);
    this.balance -= amount;
    this.transactionLog.addDebit(date, amount, this.balance);
    return `You have made a withdrawal of £${amount.toFixed(2)}. Your balance is now ${this.balance.toFixed(2)}`;
  }

  statement() {
    console.log(this.transactionLog.formatTransactions());
  }
  
  _isValid(amount) {
    if (!Number.isInteger(amount) || amount < 0) {
      throw 'That is not a valid amount. Please enter a positive integer.';
    }
    return amount
  }

  _format(date) {
    return date.toLocaleString().slice(0,10);
  }

  _checkFunds(amount) {
    if (this.balance < amount) {
      throw 'Insufficient funds!';
  }
}
}
module.exports = Bank; 