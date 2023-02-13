package com.devteam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devteam.common.ExtractJWT;
import com.devteam.common.QuestionRequest;
import com.devteam.entity.Message;
import com.devteam.service.MessageService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

	@Autowired
	private MessageService messageService;

	@PostMapping("/secure/add/message")
	public void postMessage(@RequestHeader(value = "Authorization") String token, @RequestBody Message message) {
		String email = ExtractJWT.payloadJWT(token, "\"sub\"");
		messageService.postMessage(message, email);
	}

	@PutMapping("/secure/admin/message")
	public void putMessage(@RequestHeader(value = "Authorization") String token,
			@RequestBody QuestionRequest questionRequest) throws Exception {
		String userEmail = ExtractJWT.payloadJWT(token, "\"sub\"");
		String admin = ExtractJWT.payloadJWT(token, "\"userType\"");

		if (admin == null || !admin.equals("admin")) {
			throw new Exception("Administration page only.");
		}

		messageService.putMessage(questionRequest, userEmail);
	}

}
