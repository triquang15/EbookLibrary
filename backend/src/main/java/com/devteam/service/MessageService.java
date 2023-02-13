package com.devteam.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devteam.common.QuestionRequest;
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

	public void putMessage(QuestionRequest questionRequest, String email) throws Exception {
		Optional<Message> message = messageRepository.findById(questionRequest.getId());
		if (!message.isPresent()) {
			throw new Exception("Message not found");
		}

		message.get().setAdmin(email);
		message.get().setResponse(questionRequest.getResponse());
		message.get().setClosed(true);
		messageRepository.save(message.get());
	}
}
