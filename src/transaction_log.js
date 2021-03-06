class TransactionLog {
  constructor() {
    this.log = [];
  }

  addTransaction(date, credit, debit, balance) {
    this.log.push({
      date: date,
      credit: credit,
      debit: debit,
      balance: balance,
    });
  }

  formatLog() {
    const sortedLog = this._sortByDate();
    const formatted = [];
    sortedLog.forEach((transaction) => {
      formatted.push(
        `${this._formatDate(transaction.date)} ||${this._formatNum(
          transaction.credit
        )} ||${this._formatNum(
          transaction.debit
        )} || ${transaction.balance.toFixed(2)}`
      );
    });
    return "date || credit || debit || balance\n" + formatted.join("\n");
  }

  _sortByDate() {
    let sortedLog = this.log.sort((a, b) => {
      return b.date - a.date;
    });
    return sortedLog;
  }

  _formatNum(num) {
    return num == 0 ? "" : ` ${num.toFixed(2)}`;
  }

  _formatDate(date) {
    return date.toLocaleString().slice(0, 10);
  }
}

module.exports = TransactionLog;
