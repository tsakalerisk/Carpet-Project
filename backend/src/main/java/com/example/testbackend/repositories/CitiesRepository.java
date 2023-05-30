package com.example.testbackend.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.testbackend.models.City;

public interface CitiesRepository extends CrudRepository<City, Long> {
    Optional<City> findByCityName(String cityName);
}
