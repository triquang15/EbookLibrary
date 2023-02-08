package com.devteam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devteam.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	Order findByEmailAndBookId(String email, Long bookId);
	
	List<Order> findBookByEmail(String email);

}
