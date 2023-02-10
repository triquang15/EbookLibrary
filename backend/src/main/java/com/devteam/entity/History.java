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
@Table(name = "order_details")
@Data
@NoArgsConstructor
public class History {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "email")
	private String email;

	@Column(name = "checkout_date")
	private String checkoutDate;

	@Column(name = "returned_date")
	private String returnedDate;

	@Column(name = "title")
	private String title;

	@Column(name = "author")
	private String author;

	@Column(name = "description")
	private String description;

	@Column(name = "image")
	private String image;

	public History(String email, String checkoutDate, String returnedDate, String title, String author,
			String description, String image) {
		super();
		this.email = email;
		this.checkoutDate = checkoutDate;
		this.returnedDate = returnedDate;
		this.title = title;
		this.author = author;
		this.description = description;
		this.image = image;
	}

}
