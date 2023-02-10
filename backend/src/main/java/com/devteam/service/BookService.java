package com.devteam.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devteam.common.ShelfLoansResponse;
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

	public List<ShelfLoansResponse> loansResponses(String email) throws Exception {
		List<ShelfLoansResponse> shelfLoansResponses = new ArrayList<>();

		List<Order> ordersList = orderRepository.findBookByEmail(email);
		List<Long> bookIdList = new ArrayList<>();

		for (Order order : ordersList) {
			bookIdList.add(order.getBookId());
		}

		List<Book> books = bookRepository.findBooksByBookIds(bookIdList);

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		for (Book book : books) {
			Optional<Order> optional = ordersList.stream().filter(x -> x.getBookId() == book.getId()).findFirst();

			if (optional.isPresent()) {
				Date date1 = dateFormat.parse(optional.get().getReturnDate());
				Date date2 = dateFormat.parse(LocalDate.now().toString());

				TimeUnit timeUnit = TimeUnit.DAYS;
				long inTime = timeUnit.convert(date1.getTime() - date2.getTime(), TimeUnit.MILLISECONDS);
				shelfLoansResponses.add(new ShelfLoansResponse(book, (int) inTime));
			}
		}
		return shelfLoansResponses;
	}

	public void returnBook(String userEmail, long bookId) throws Exception {
		Optional<Book> book = bookRepository.findById(bookId);
		Order order = orderRepository.findByEmailAndBookId(userEmail, bookId);

		if (!book.isPresent() || order == null) {
			throw new Exception("Book does not exits");
		}

		book.get().setCopiesAvailable(book.get().getCopiesAvailable() + 1);
		bookRepository.save(book.get());
		orderRepository.deleteById(order.getId());
	}

	public void renewLoan(String userEmail, Long bookId) throws Exception {
		Order order = orderRepository.findByEmailAndBookId(userEmail, bookId);

		if (order == null) {
			throw new Exception("Book does not exits");
		}

		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = dateFormat.parse(order.getReturnDate());
		Date date2 = dateFormat.parse(LocalDate.now().toString());

		if (date1.compareTo(date2) > 0 || date1.compareTo(date2) == 0) {
			order.setReturnDate(LocalDate.now().plusDays(7).toString());
			orderRepository.save(order);
		}
	}
}
