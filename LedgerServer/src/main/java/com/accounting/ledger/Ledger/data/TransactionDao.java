package com.accounting.ledger.Ledger.data;

import com.accounting.ledger.Ledger.models.Transaction;

import java.util.List;

public interface TransactionDao {

     List<Transaction> getAll(int userId);
    Transaction getById(int id, int userId);
    Transaction addTransaction(Transaction transaction, int userId);
    void update(int id, Transaction transaction, int userId);
    void delete(int id, int userId);

}
