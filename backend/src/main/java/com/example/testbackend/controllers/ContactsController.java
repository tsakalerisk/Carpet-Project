package com.example.testbackend.controllers;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.example.testbackend.models.FullContact;
import com.example.testbackend.models.State;
import com.example.testbackend.repositories.CitiesRepository;
import com.example.testbackend.repositories.ContactsRepository;
import com.example.testbackend.repositories.FullContactRepository;
import com.example.testbackend.repositories.StatesRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/contacts")
public class ContactsController {
    @Autowired
    private ContactsRepository contactsRepository;
    @Autowired
    private CitiesRepository citiesRepository;
    @Autowired
    private StatesRepository statesRepository;
    @Autowired
    private FullContactRepository fullContactRepository;

    @GetMapping(produces = "application/json")
    public ResponseEntity<List<FullContact>> getContacts(Pageable pageable) {
        Page<FullContact> page = fullContactRepository.findAll(
                PageRequest.of(
                        pageable.getPageNumber(),
                        pageable.getPageSize(),
                        pageable.getSortOr(Sort.by(Sort.Direction.ASC, "contactId"))));
        return ResponseEntity.ok(page.getContent());
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<FullContact> getContactbyId(@PathVariable Long id) {
        Optional<FullContact> contactOptional = fullContactRepository.findById(id);
        if (contactOptional.isPresent()) {
            return ResponseEntity.ok(contactOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @PostMapping(produces = "application/json")
    public ResponseEntity<String> addContact(@RequestBody FullContact contact, UriComponentsBuilder ucb) {
        Optional<City> city = citiesRepository.findByCityName(contact.cityName());
        if (!city.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Invalid city");
        }
        Optional<State> state = statesRepository.findByStateName(contact.stateName());
        if (!state.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Invalid state");
        }
        if (!city.get().stateId().equals(state.get().stateId())) {
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("City-state mismatch");
        }
        Contact savedContact = contactsRepository.save(new Contact(
                contact.contactId(),
                contact.firstName(),
                contact.lastName(),
                contact.streetAddress(),
                contact.zipCode(),
                city.get().cityId(),
                contact.phoneNumber(),
                contact.emailAddress()));
        URI location = ucb.path("/conatcts/{id}").buildAndExpand(savedContact.contactId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping()
    public void deleteContact(@RequestParam("id") Long contactId) {
        contactsRepository.deleteById(contactId);
        ResponseEntity.ok();
    }
}