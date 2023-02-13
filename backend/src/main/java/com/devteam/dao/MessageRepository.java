package com.devteam.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import com.devteam.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
	
	Page<Message> findByEmail(@RequestParam("email") String email, Pageable pageable);
	
	Page<Message> findByClosed(@RequestParam("closed") boolean closed, Pageable pageable);
}
