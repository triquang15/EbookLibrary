package com.devteam.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import com.devteam.entity.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
	Page<Book> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

	Page<Book> findByCategory(@RequestParam("category") String category, Pageable pageable);

	@Query("SELECT b FROM Book b WHERE id IN :book_ids")
	List<Book> findBooksByBookIds(@Param("book_ids") List<Long> bookId);

}
