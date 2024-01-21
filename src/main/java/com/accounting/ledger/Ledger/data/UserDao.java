package com.accounting.ledger.Ledger.data;

import com.accounting.ledger.Ledger.models.User;

import java.util.List;

public interface UserDao {

    List<User> getAll();

    User getUserById(int userId);

    User getByUserName(String username);

    int getIdByUsername(String username);

    User create(User user);

    boolean exists(String username);
}
