package com.example.testbackend.models;

import lombok.Data;

@Data
public class InputContact {
    private Integer contactId;
    private String firstName;
    private String lastName;
    private String streetAddress;
    private Integer zipCode;
    private String cityName;
    private String stateName;
    private String phoneNumber;
    private String emailAddress;
}
