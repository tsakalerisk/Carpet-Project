package com.example.testbackend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.testbackend.models.State;

public interface StatesRepository extends JpaRepository<State, Integer> {
    Optional<State> findByStateName(String stateName);
}
