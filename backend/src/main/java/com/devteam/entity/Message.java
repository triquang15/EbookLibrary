package com.devteam.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
public class Message {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	public Message(String title, String question) {
		super();
		this.title = title;
		this.question = question;
	}

	@Column(name = "email")
	private String email;

	@Column(name = "title")
	private String title;

	@Column(name = "question")
	private String question;
	
	@Column(name = "admin")
	private String admin;
	
	@Column(name = "response")
	private String response;
	
	@Column(name = "closed")
	private boolean closed;
}
