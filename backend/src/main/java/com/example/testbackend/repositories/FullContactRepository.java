package com.example.testbackend.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.example.testbackend.models.FullContact;

public interface FullContactRepository extends CrudRepository<FullContact, Long>, PagingAndSortingRepository<FullContact, Long> {
    
}
