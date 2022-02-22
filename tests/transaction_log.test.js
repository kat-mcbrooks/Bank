const TransactionLog = require("../lib/transaction_log");

describe("TransactionLog", () => {
  beforeEach(() => {
    transactionLog = new TransactionLog();
  });

  it("begins with empty transaction list", () => {
    expect(transactionLog.log).toEqual([]);
  });

  it("formats transactions consisting of debits and credits", () => {
    transactionLog.addCredit("10/01/2023", 1000, 1000);
    transactionLog.addCredit("12/01/2023", 2000, 3000);
    transactionLog.addDebit("13/01/2023", 500, 2500);
    expect(transactionLog.formatTransactions()).toEqual(
      "date || credit || debit || balance\n13/01/2023 || || 500.00 || 2500.00\n12/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
});
