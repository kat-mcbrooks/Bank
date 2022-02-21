## Bank Tech Test

### User stories / requirements

* client can make a deposit of a numeric value (nb. from the specification, this will be an integer)
* client can make a withdrawal of a numeric value (nb. from the specification, this will be an integer)
* client can view/print account statement 
  * account statement displays date the transaction was made, a value in the credit (if deposit) or debit (if withdrawal) column, and the balance after the transaction
  * numbers on statement display with 2 decimal points 
  * account statement displays in the specified format as below:
```
date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00
```

### How to run the Bank code via node
1. Open node, or your chosen REPL
2. Load the file
``` > .load bank.js ```
3. Instantiate a Bank and make deposits, withdrawals, and request a printed to screen statement as per the example below.
  * You must pass two parameters to the deposit and withdraw methods. The first parameter should be an integer and the second parameter should be a date string, formatted as "DD-MM-YYYY", as per the acceptance criteria.
  * In order to print the statement to screen in the specified format, use console.log (as in the example below)
``` 
> bank = new Bank;
> bank.deposit(2000, "13/01/2023");
> bank.deposit(1000, "13/01/2023");
> bank.withdraw(500, "14/01/2023");
> console.log(bank.statement());
 ```

### How to run the tests: 
Install jest within the project directory, per the dependencies in the package.json: 
```
npm install jest;
```
Run jest to run all tests or a particular test: 
``` 
jest
```
Test coverage is 100%. To check coverage, run: 
``` 
jest --coverage
```

