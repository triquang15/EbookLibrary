package com.devteam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devteam.common.ExtractJWT;
import com.devteam.entity.Book;
import com.devteam.service.BookService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
	@Autowired
	private BookService bookService;

	@PutMapping("/checkout")
	public Book checkoutBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
		String email = ExtractJWT.payloadJWT(token, "\"sub\"");

		return bookService.checkoutBook(email, bookId);
	}

	@GetMapping("/checkout/ischecked")
	public Boolean checkoutBookByEmail(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) {
		
		String email = ExtractJWT.payloadJWT(token, "\"sub\"");

		return bookService.checkoutBookByEmail(email, bookId);
	}

	@GetMapping("/checkout/currentloans")
	public int currentLoans(@RequestHeader(value = "Authorization") String token) {
		String email = ExtractJWT.payloadJWT(token, "\"sub\"");

		return bookService.currentLoansCount(email);
	}
}
