package com.devteam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devteam.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	Order findByEmailAndBookId(String email, Long bookId);
	
	List<Order> findBookByEmail(String email);
	
	@Modifying
	@Query("DELETE FROM Order WHERE book_id in :book_id")
	void deleteAllByBookId(@Param("book_id") Long bookId);

}
