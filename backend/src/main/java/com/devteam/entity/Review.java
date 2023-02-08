package com.devteam.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.Data;

@Entity
@Table(name = "review")
@Data
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "date")
	@CreationTimestamp
	private Date date;
	
	@Column(name = "rating")
	private double rating;
	
	@Column(name = "book_id")
	private Long bookId;
	
	@Column(name = "fullname")
	private String fullname;
	
	@Column(name = "headline")
	private String headline;
	
	@Column(name = "message")
	private String message;
	
	
}
