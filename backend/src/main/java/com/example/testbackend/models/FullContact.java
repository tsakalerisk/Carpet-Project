package com.example.testbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "FULL_CONTACTS")
public record FullContact(@Id @Column("contact_id") Long contactId,
                @Column("first_name") String firstName,
                @Column("last_name") String lastName,
                @Column("street_address") String streetAddress,
                @Column("zip_code") Integer zipCode,
                @Column("city_name") String cityName,
                @Column("state_name") String stateName,
                @Column("phone_number") String phoneNumber,
                @Column("email_address") String emailAddress) {
}
