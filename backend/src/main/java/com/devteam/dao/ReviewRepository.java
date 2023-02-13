package com.devteam.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import com.devteam.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
	Page<Review> findByBookId(@RequestParam("book_id") Long bookId, Pageable pageable);
	
	Review findByEmailAndBookId(String email, Long bookId);
	
	@Modifying
	@Query("DELETE FROM Review WHERE book_id in :book_id")
	void deleteAllByBookId(@Param("book_id") Long bookId);

}
