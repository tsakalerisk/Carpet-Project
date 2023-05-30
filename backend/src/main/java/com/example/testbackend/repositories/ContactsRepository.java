package com.example.testbackend.repositories;

import org.springframework.data.repository.CrudRepository;
import com.example.testbackend.models.Contact;

public interface ContactsRepository extends CrudRepository<Contact, Long> {
}
