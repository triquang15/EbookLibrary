package com.devteam.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devteam.dao.BookRepository;
import com.devteam.dao.OrderRepository;
import com.devteam.entity.Book;
import com.devteam.entity.Order;

@Service
@Transactional
public class BookService {
	@Autowired
	private BookRepository bookRepository;

	@Autowired
	private OrderRepository orderRepository;

	public Book checkoutBook(String email, Long bookId) throws Exception {
		Optional<Book> book = bookRepository.findById(bookId);

		Order order = orderRepository.findByEmailAndBookId(email, bookId);

		if (!book.isPresent() || order != null || book.get().getCopiesAvailable() <= 0) {
			throw new Exception("Book already checked out by user");
		}

		book.get().setCopiesAvailable(book.get().getCopiesAvailable() - 1);
		bookRepository.save(book.get());

		Order newOrder = new Order(email, LocalDate.now().toString(), LocalDate.now().plusDays(7).toString(),
				book.get().getId());

		orderRepository.save(newOrder);
		return book.get();

	}

	public Boolean checkoutBookByEmail(String email, Long bookId) {
		Order order = orderRepository.findByEmailAndBookId(email, bookId);
		if (order != null) {
			return true;
		} else {
			return false;
		}
	}

	public int currentLoansCount(String email) {
		return orderRepository.findBookByEmail(email).size();
	}
}
