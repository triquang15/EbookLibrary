package com.devteam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devteam.dao.MessageRepository;
import com.devteam.entity.Message;

@Service
@Transactional
public class MessageService {
	@Autowired
	private MessageRepository messageRepository;
	
	public void postMessage(Message messageRequest, String email) {
		Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
		message.setEmail(email);
		messageRepository.save(message);
	}
}
