package com.example.testbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.testbackend.models.City;
import com.example.testbackend.repositories.CitiesRepository;

@RestController
@CrossOrigin
@RequestMapping("/cities")
public class CitiesController {
    @Autowired
    private CitiesRepository citiesRepository;

    @GetMapping(produces = "application/json")
    public ResponseEntity<Iterable<City>> getCities() {
        return ResponseEntity.ok(citiesRepository.findAll());
    }
}
