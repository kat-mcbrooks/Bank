const TransactionLog = require("../lib/transaction_log");

describe("TransactionLog", () => {
  beforeEach(() => {
    date1 = new Date(2023, 0, 10, 0, 0, 0, 0)
    date2 = new Date(2023, 0, 12, 0, 0, 0, 0)
    date3 = new Date(2023, 0, 14, 0, 0, 0, 0)
    transactionLog = new TransactionLog();
    transactionLog.addTransaction(date1, 1000.00, 0, 1000.00);
    transactionLog.addTransaction(date2, 2000.00, 0, 3000);
    transactionLog.addTransaction(date3, 0, 500.00, 2500);
  });

  // it("begins with empty transaction list", () => {
  //   expect(transactionLog.log).toEqual([]);
  // });
  it('sorts its log of transactions by date', () => {
    console.log(transactionLog.log);
    console.log(transactionLog.sortByDate());
    expect(transactionLog.sortByDate()).toEqual([
      {
        date: date3,
        credit: 0,
        debit: 500,
        balance: 2500
      }, 
      {
        date: date2,
        credit: 2000,
        debit: 0,
        balance: 3000
      },
      {
        date: date1,
        credit: 1000,
        debit: 0,
        balance: 1000
      }    
    ])
  })
  it("formats debits, credits and balance with 2 decimal points", () => {
    expect(transactionLog._formatNum(20)).toEqual(" 20.00")
  })
  it("formats 0 to empty string", () => {
    expect(transactionLog._formatNum(0)).toEqual("")
  })
  it("formats transactions consisting of debits and credits", () => {
    expect(transactionLog.formatLog()).toEqual(
      "date || credit || debit || balance\n14/01/2023 || || 500.00 || 2500.00\n12/01/2023 || 2000.00 || || 3000.00\n10/01/2023 || 1000.00 || || 1000.00"
    );
  });
});
