package com.accounting.ledger.Ledger.controllers;

import com.accounting.ledger.Ledger.data.UserDao;
import com.accounting.ledger.Ledger.data.mysql.MyTransactionDao;
import com.accounting.ledger.Ledger.models.Transaction;
import com.accounting.ledger.Ledger.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
@RestController
@PreAuthorize("isAuthenticated()")
@RequestMapping("transactions")
@CrossOrigin
public class TransactionController {

    private final MyTransactionDao transactionDao;
    private final UserDao userDao;

    @Autowired
    public TransactionController(MyTransactionDao transactionDao , UserDao userDao) {
        this.transactionDao = transactionDao;
        this.userDao = userDao;
    }

    // addTransaction REST API
    // http://localhost:8080/transactions
    @PostMapping
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction, Principal principal) {
        String userName = principal.getName();
        User user = userDao.getByUserName(userName);
        int userId = user.getId();
        Transaction savedTransaction = transactionDao.addTransaction(transaction, userId);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    // getTransactionById REST API
    // http://localhost:8080/transactions/{id}
    @GetMapping("{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable("id") int transactionId, Principal principal) {
        String userName = principal.getName();
        User user = userDao.getByUserName(userName);
        int userId = user.getId();
        Transaction transaction = transactionDao.getById(transactionId, userId);
        return new ResponseEntity<>(transaction, HttpStatus.OK);
    }

    // getAllTransactions REST API
    // http://localhost:8080/transactions
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(Principal principal) {

        String userName = principal.getName();
        User user = userDao.getByUserName(userName);
        int userId = user.getId();


        List<Transaction> allTransactions = transactionDao.getAll(userId);
        return new ResponseEntity<>(allTransactions, HttpStatus.OK);
    }


    // updateTransaction REST API
    // http://localhost:8080/transactions/{id}
    @PutMapping("{id}")
    public ResponseEntity<String> updateTransaction(@PathVariable("id") int transactionID,
                                                  @RequestBody Transaction transaction, Principal principal) {
        String userName = principal.getName();
        User user = userDao.getByUserName(userName);
        int userId = user.getId();
        transactionDao.update(transactionID, transaction, userId);
        return new ResponseEntity<>("Transaction updated", HttpStatus.OK);

    }

    // deleteTransaction REST API
    // http://localhost:8080/transactions/{id}
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable("id") int transactionId, Principal principal) {
        String userName = principal.getName();
        User user = userDao.getByUserName(userName);
        int userId = user.getId();
        transactionDao.delete(transactionId, userId);
        return new ResponseEntity<>("Transaction successfully deleted.", HttpStatus.NO_CONTENT);
    }
}
