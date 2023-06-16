package com.example.testbackend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.testbackend.models.City;

public interface CitiesRepository extends JpaRepository<City, Integer> {
    Optional<City> findByCityName(String cityName);
}
