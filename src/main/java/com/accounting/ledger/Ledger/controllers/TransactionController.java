package com.accounting.ledger.Ledger.controllers;

import com.accounting.ledger.Ledger.data.mysql.MyTransactionDao;
import com.accounting.ledger.Ledger.models.Transaction;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@AllArgsConstructor
@RequestMapping("transactions")
public class TransactionController {

    private MyTransactionDao transactionDao;

    // addTransaction REST API
    // http://localhost:8080/transactions
    @PostMapping
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction) {
        Transaction savedTransaction = transactionDao.addTransaction(transaction);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    // getTransactionById REST API
    // http://localhost:8080/transactions/{id}
    @GetMapping("{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable("id") int transactionId) {
        Transaction transaction = transactionDao.getById(transactionId);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    // getAllTransactions REST API
    // http://localhost:8080/transactions
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> allTransactions = transactionDao.getAll();
        return new ResponseEntity<>(allTransactions, HttpStatus.OK);
    }

    // updateTransaction REST API
    // http://localhost:8080/transactions/{id}
    @PutMapping("{id}")
    public ResponseEntity<String> updateTransaction(@PathVariable("id") int transactionID,
                                                  @RequestBody Transaction transaction) {
        transactionDao.update(transactionID, transaction);
        return new ResponseEntity<>("Transaction updated", HttpStatus.OK);
    }

    // deleteTransaction REST API
    // http://localhost:8080/transactions/{id}
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable("id") int transactionId) {
        transactionDao.delete(transactionId);
        return new ResponseEntity<>("User successfully deleted.", HttpStatus.OK);
    }
}
