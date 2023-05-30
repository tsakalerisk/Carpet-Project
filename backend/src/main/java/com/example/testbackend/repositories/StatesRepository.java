package com.example.testbackend.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.testbackend.models.State;

public interface StatesRepository extends CrudRepository<State, Long> {
    Optional<State> findByStateName(String stateName);
}
