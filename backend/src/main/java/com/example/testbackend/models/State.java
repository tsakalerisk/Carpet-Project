package com.example.testbackend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "state")
public record State(
        @Id @Column("state_id") Long stateId,
        @Column("state_name") String stateName) {

}
