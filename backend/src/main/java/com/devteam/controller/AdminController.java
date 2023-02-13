package com.devteam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
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
}
