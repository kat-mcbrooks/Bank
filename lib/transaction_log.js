class TransactionLog {
  constructor() {
    this.log = []
  }

  addCredit(date, amount, balance) {
    this.log.push(`${date} || ${amount.toFixed(2)} || || ${balance.toFixed(2)}`);
  }

  addDebit(date, amount, balance) {
    this.log.push(`${date} || || ${amount.toFixed(2)} || ${balance.toFixed(2)}`);
  }

  formatTransactions() {
    return "date || credit || debit || balance\n" + this.log.reverse().join("\n");
  }
}

module.exports = TransactionLog;