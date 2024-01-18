package com.accounting.ledger.Ledger.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class Transaction {

    private int id;
    private String description;
    private String vendor;
    private LocalDate date;
    private LocalTime time;
    private double amount;

}

