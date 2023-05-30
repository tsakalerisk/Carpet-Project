package com.example.testbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "city")
public record City(
        @Id @Column("city_id") Long cityId,
        @Column("city_name") String cityName,
        @Column("state_id") Long stateId) {

}
