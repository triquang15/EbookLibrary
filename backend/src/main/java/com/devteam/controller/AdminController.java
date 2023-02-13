package com.devteam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devteam.common.AddBookRequest;
import com.devteam.common.ExtractJWT;
import com.devteam.service.AdminService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;

	@PostMapping("/secure/add/book")
	public void newBook(@RequestHeader(value = "Authorization") String token,
			@RequestBody AddBookRequest addBookRequest) throws Exception {
		String admin = ExtractJWT.payloadJWT(token, "\"userType\"");
		if (admin == null || !admin.equals("admin")) {
			throw new Exception("Administartion page only");
		}

		adminService.addNewBook(addBookRequest);

	}

	@PutMapping("/secure/increase/book/quantity")
	public void increaseBookQuantity(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId)
			throws Exception {
		String admin = ExtractJWT.payloadJWT(token, "\"userType\"");
		if (admin == null || !admin.equals("admin")) {
			throw new Exception("Administartion page only");
		}

		adminService.increaseBook(bookId);
	}

	@PutMapping("/secure/decrease/book/quantity")
	public void decreaseBookQuantity(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId)
			throws Exception {
		String admin = ExtractJWT.payloadJWT(token, "\"userType\"");
		if (admin == null || !admin.equals("admin")) {
			throw new Exception("Administartion page only");
		}

		adminService.decreaseBook(bookId);
	}

	@DeleteMapping("/secure/delete/book")
	public void deleteBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId)
			throws Exception {
		String admin = ExtractJWT.payloadJWT(token, "\"userType\"");
		if (admin == null || !admin.equals("admin")) {
			throw new Exception("Administartion page only");
		}

		adminService.deleteBook(bookId);
	}
}
