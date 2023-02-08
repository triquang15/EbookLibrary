package com.devteam.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
public class Order {

	public Order() {
	}

	public Order(String email, String checkoutDate, String returnDate, Long bookId) {
		this.email = email;
		this.checkoutDate = checkoutDate;
		this.returnDate = returnDate;
		this.bookId = bookId;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@Column(name = "email")
	private String email;

	@Column(name = "checkout_date")
	private String checkoutDate;

	@Column(name = "return_date")
	private String returnDate;

	@Column(name = "book_id")
	private Long bookId;

}
