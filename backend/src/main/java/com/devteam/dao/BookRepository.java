package com.devteam.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devteam.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
