package com.example.testbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.testbackend.models.Contact;

public interface ContactsRepository extends JpaRepository<Contact, Integer> {
}
