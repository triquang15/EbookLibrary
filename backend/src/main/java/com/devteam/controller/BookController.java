package com.devteam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devteam.entity.Book;
import com.devteam.service.BookService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {
	@Autowired
	private BookService bookService;

	@PutMapping("/checkout")
	public Book checkoutBook(@RequestParam Long bookId) throws Exception {
		String email = "mina_92@gmail.com";

		return bookService.checkoutBook(email, bookId);
	}

	@GetMapping("/checkout/ischecked")
	public Boolean checkoutBookByEmail(@RequestParam Long bookId) {
		String email = "mina_92@gmail.com";

		return bookService.checkoutBookByEmail(email, bookId);
	}

	@GetMapping("/checkout/currentloans")
	public int currentLoans() {
		String email = "mina_92@gmail.com";

		return bookService.currentLoansCount(email);
	}
}
