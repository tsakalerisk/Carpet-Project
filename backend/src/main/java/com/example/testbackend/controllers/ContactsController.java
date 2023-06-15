package com.example.testbackend.controllers;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.testbackend.models.City;
import com.example.testbackend.models.Contact;
import com.example.testbackend.models.State;
import com.example.testbackend.repositories.CitiesRepository;
import com.example.testbackend.repositories.ContactsRepository;
import com.example.testbackend.repositories.StatesRepository;

import lombok.Data;

@RestController
@CrossOrigin
@RequestMapping("/contacts")
public class ContactsController {
    @Autowired
    private ContactsRepository contactsRepository;
    @Autowired
    private CitiesRepository citiesRepository;
    @Autowired
    private StatesRepository statesRepository;

    @GetMapping(produces = "application/json")
    public ResponseEntity<Page<Contact>> getContacts(Pageable pageable, InputContact inputContact) {
        City city = new City();

        if (inputContact.getCityName() != null) {
            Optional<City> optionalCity = citiesRepository.findByCityName(inputContact.getCityName());
            if (!optionalCity.isPresent())
                return ResponseEntity.ok(Page.empty());
            city = optionalCity.get();
        }

        if (inputContact.getStateName() != null) {
            Optional<State> optionalState = statesRepository.findByStateName(inputContact.getStateName());
            if (!optionalState.isPresent())
                return ResponseEntity.ok(Page.empty());
            city.setState(optionalState.get());
        }

        Contact exampleContact = new Contact(
                inputContact.getContactId(),
                inputContact.getFirstName(),
                inputContact.getLastName(),
                inputContact.getStreetAddress(),
                inputContact.getZipCode(),
                city,
                inputContact.getPhoneNumber(),
                inputContact.getEmailAddress());

        Page<Contact> page = contactsRepository.findAll(
                Example.of(exampleContact),
                PageRequest.of(
                        pageable.getPageNumber(),
                        pageable.getPageSize(),
                        pageable.getSortOr(Sort.by(Sort.Direction.ASC, "contactId"))));
        return ResponseEntity.ok(page);
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Contact> getContactbyId(@PathVariable Integer id) {
        Optional<Contact> contactOptional = contactsRepository.findById(id);
        if (contactOptional.isPresent()) {
            return ResponseEntity.ok(contactOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PostMapping()
    public ResponseEntity<String> addContact(@RequestBody InputContact inputContact, UriComponentsBuilder ucb) {
        Optional<City> city = citiesRepository.findByCityName(inputContact.getCityName());
        if (!city.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Invalid city");
        }
        Optional<State> state = statesRepository.findByStateName(inputContact.getStateName());
        if (!state.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Invalid state");
        }
        if (!city.get().getState().getStateId().equals(state.get().getStateId())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("City-state mismatch");
        }

        Contact savedContact = contactsRepository.save(new Contact(
                inputContact.getContactId(),
                inputContact.getFirstName(),
                inputContact.getLastName(),
                inputContact.getStreetAddress(),
                inputContact.getZipCode(),
                city.get(),
                inputContact.getPhoneNumber(),
                inputContact.getEmailAddress()));
        URI location = ucb.path("/contacts/{id}").buildAndExpand(savedContact.getContactId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping()
    public void deleteContact(@RequestParam("id") Integer contactId) {
        contactsRepository.deleteById(contactId);
        ResponseEntity.ok();
    }

    @Data
    private class InputContact {
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
}