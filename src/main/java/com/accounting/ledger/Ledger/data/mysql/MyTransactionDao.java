package com.accounting.ledger.Ledger.data.mysql;

import com.accounting.ledger.Ledger.data.TransactionDao;
import com.accounting.ledger.Ledger.models.Transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Component
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
        String query = "SELECT * FROM transactions WHERE transaction_id = ?";

        try (Connection connection = this.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            preparedStatement.setInt(1, id);

            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    return mapRow(resultSet);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    public Transaction addTransaction(Transaction transaction){
        String query = "INSERT INTO transactions (transaction_description, vendor_name, transaction_date, transaction_time, amount) VALUES (?, ?, ?, ?, ?)";

        try (Connection connection = this.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
            preparedStatement.setString(1, transaction.getDescription());
            preparedStatement.setString(2, transaction.getVendor());
            preparedStatement.setDate(3, java.sql.Date.valueOf(transaction.getDate()));
            preparedStatement.setTime(4, java.sql.Time.valueOf(transaction.getTime()));
            preparedStatement.setDouble(5, transaction.getAmount());

            preparedStatement.executeUpdate();

            try (ResultSet generatedKeys = preparedStatement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    int generatedId = generatedKeys.getInt(1);
                    transaction.setId(generatedId);
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return transaction;
    }

    public void update(int id, Transaction transaction){
        String query = "UPDATE transactions SET transaction_description = ?, vendor_name = ?, transaction_date = ?, transaction_time = ?, amount = ? WHERE transaction_id = ?";
        try (Connection connection = this.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            preparedStatement.setString(1, transaction.getDescription());
            preparedStatement.setString(2, transaction.getVendor());
            preparedStatement.setDate(3, java.sql.Date.valueOf(transaction.getDate()));
            preparedStatement.setTime(4, java.sql.Time.valueOf(transaction.getTime()));
            preparedStatement.setDouble(5, transaction.getAmount());
            preparedStatement.setInt(6, id);

            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void delete(int id){
        String query = "DELETE FROM transactions WHERE transaction_id = ?";
        try (Connection connection = this.getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            preparedStatement.setInt(1, id);

            preparedStatement.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

    private Transaction mapRow(ResultSet resultSet) throws SQLException {
        DateTimeFormatter sqlDateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            int id = resultSet.getInt("transaction_id");
            String description = resultSet.getString("transaction_description");
            String vendor = resultSet.getString("vendor_name");
            LocalDate date = LocalDate.parse( (resultSet.getDate("transaction_date").toString()), sqlDateFormat);
            LocalTime time = resultSet.getTime("transaction_time").toLocalTime();
            double amount = resultSet.getDouble("amount");

            return new Transaction(id,description, vendor, date, time, amount);
    }
}
