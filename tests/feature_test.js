const Bank = require("../lib/bank");

// Feature test 1: to check that program runs as per acceptance criteria
const b = new Bank
b.deposit(1000, new Date(2023, 0, 10, 0, 0, 0, 0))
b.deposit(2000, new Date(2023, 0, 13, 0, 0, 0, 0))
b.withdraw(500, new Date(2023, 0, 14, 0, 0, 0, 0))

b.statement()

/* 
output to console should look like: 
date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00
*/

// Feature test 2: to check that error messages display if client tries to withdraw more than their balance 
const b1 = new Bank
b1.withdraw(1) 
/* 
output to console should be: 
Insufficient funds!
*/

// Feature test 3: to check that error messages display if client enters invalid amount to deposit 
const b3 = new Bank
b3.deposit(-500)
/* 
output to console should be: 
That is not a valid amount. Please enter a positive integer.
*/

// Feature test 4: to check that error messages display if client enters invalid amount to withdraw 
const b4 = new Bank
b4.deposit(100)
b4.withdraw(12.50)
/* 
output to console should be: 
That is not a valid amount. Please enter a positive integer.
*/