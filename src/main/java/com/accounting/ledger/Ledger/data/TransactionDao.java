package com.accounting.ledger.Ledger.data;

import com.accounting.ledger.Ledger.models.Transaction;

import java.util.List;

public interface TransactionDao {

     List<Transaction> getAll();
    Transaction getById(int id);
    Transaction addTransaction(Transaction transaction);
    void update(int id, Transaction transaction);
    void delete(int id);

}
