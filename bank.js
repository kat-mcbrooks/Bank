class Bank {
  constructor() {
    this.balance = 0
    this.transactions = []
  }
  
  deposit(amount, date) {
    if (!Number.isInteger(amount) || amount < 0) {
      throw 'That is not a valid amount. Please enter a positive integer.'
    } 
    date = this._format(date);
    this.balance += amount;
    this.transactions.push(`${date} || ${amount.toFixed(2)} || || ${this.balance.toFixed(2)}`);
    return this.transactions.at(-1);
  }

  withdraw(amount, date) {
    if (!Number.isInteger(amount) || amount < 0) {
      throw 'That is not a valid amount. Please enter a positive integer.';
    }
    else if (this.balance < amount) {
      throw 'Insufficient funds!';
    }
    date = this._format(date);    
    this.balance -= amount;
    this.transactions.push(`${date} || || ${amount.toFixed(2)} || ${this.balance.toFixed(2)}`);
    return this.transactions.at(-1);
  }

  statement() {
    const AllTransactions = this.transactions.reverse().join("\n")
    return "date || credit || debit || balance\n" + AllTransactions;
  }
  
  _format(date) {
    if (!typeof date === 'string') {
      throw 'That is not a valid date. Please enter date in the format DD-MM-YYYY';
    } 
    else if (date.charAt(2) != '-' && date.charAt(5) != '-') {
      throw 'That is not a valid date. Please enter date in the format DD-MM-YYYY';
    }
    else {
      return date.split('-').join('/');
    }
  }
}
module.exports = Bank; 