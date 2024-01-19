package com.accounting.ledger.Ledger.models.authentication;

import com.accounting.ledger.Ledger.models.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {
    @JsonProperty("token")
    private String token;

    @JsonProperty("user")
    private User user;
}
