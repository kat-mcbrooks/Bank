class Bank {
  constructor() {
    this.balance = 0
    this.transactions = []
  }
  
  deposit(amount, date) {
    this.balance += amount;
    this.transactions.push(`${date} || ${amount.toFixed(2)} || || ${this.balance.toFixed(2)}`);
    return this.transactions.at(-1);
  }

  withdraw(amount, date) {
    this.balance -= amount;
    this.transactions.push(`${date} || || ${amount.toFixed(2)} || ${this.balance.toFixed(2)}`);
    return this.transactions.at(-1);
  }

  statement() {
    const AllTransactions = this.transactions.reverse().join("\n")
    return "date || credit || debit || balance\n" + AllTransactions;
  }
}
module.exports = Bank; 