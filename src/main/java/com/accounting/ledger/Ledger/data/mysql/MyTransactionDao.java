package com.accounting.ledger.Ledger.data.mysql;

import com.accounting.ledger.Ledger.data.TransactionDao;
import com.accounting.ledger.Ledger.models.Transaction;

import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

public class MyTransactionDao extends MySqlDaoBase implements TransactionDao {


    @Autowired
    public MyTransactionDao(DataSource dataSource) {
        super(dataSource);
    }

    public List<Transaction> getAll(){
        List<Transaction> transactions = new ArrayList<>();

        String sql = "SELECT * FROM transactions";

        try (Connection connection = this.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                while (resultSet.next()) {
                    Transaction transaction = mapRow(resultSet);
                    transactions.add(transaction);
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return transactions;
    }

    public Transaction getById(int id){
        return null;
    }

    public Transaction addTransaction(Transaction transaction){
        return null;
    }

    public void update(int id, Transaction transaction){}

    public void delete(int id){}

    private Transaction mapRow(ResultSet resultSet) throws SQLException {


            String description = resultSet.getString("transaction_description");
            String vendor = resultSet.getString("vendor_name");
            LocalDate date = resultSet.getDate("transaction_date").toLocalDate();
            LocalTime time = resultSet.getTime("transaction_time").toLocalTime();
            double amount = resultSet.getDouble("amount");

            return new Transaction(description, vendor, date, time, amount);
    }
}
