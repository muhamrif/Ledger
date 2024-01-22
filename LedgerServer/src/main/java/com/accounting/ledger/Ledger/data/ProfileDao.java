package com.accounting.ledger.Ledger.data;

import com.accounting.ledger.Ledger.models.Profile;

public interface ProfileDao {
    Profile create(Profile profile);
    Profile update(Profile profile);
    Profile get(int id);
}
