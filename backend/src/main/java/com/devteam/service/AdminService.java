package com.devteam.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devteam.common.AddBookRequest;
import com.devteam.dao.BookRepository;
import com.devteam.entity.Book;

@Service
@Transactional
public class AdminService {
	@Autowired
	private BookRepository bookRepository;

	public void addNewBook(AddBookRequest addBookRequest) {
		Book book = new Book();
		book.setTitle(addBookRequest.getTitle());
		book.setDescription(addBookRequest.getDescription());
		book.setAuthor(addBookRequest.getAuthor());
		book.setCategory(addBookRequest.getCategory());
		book.setCopies(addBookRequest.getCopies());
		book.setCopiesAvailable(addBookRequest.getCopies());
		book.setImage(addBookRequest.getImage());

		bookRepository.save(book);
	}
}
