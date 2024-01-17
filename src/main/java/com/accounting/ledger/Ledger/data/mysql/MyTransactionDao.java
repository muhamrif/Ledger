package com.accounting.ledger.Ledger.data.mysql;

import com.accounting.ledger.Ledger.models.Transaction;
import lombok.AllArgsConstructor;

import javax.sql.DataSource;
import java.util.List;

@AllArgsConstructor
public class MyTransactionDao {
    private DataSource dataSource;

    public List<Transaction> getAll(){
        return null;
    }

    public Transaction getById(int id){
        return null;
    }

    public Transaction addTransaction(Transaction transaction){
        return null;
    }

    public void update(int id, Transaction transaction){}

    public void delete(int id){}
}
