package com.example.testbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.testbackend.models.State;
import com.example.testbackend.repositories.StatesRepository;

@RestController
@CrossOrigin
@RequestMapping("/states")
public class StatesController {
    @Autowired
    private StatesRepository statesRepository;

    @GetMapping(produces = "application/json")
    public ResponseEntity<Iterable<State>> getStates() {
        return ResponseEntity.ok(statesRepository.findAll());
    }
}
