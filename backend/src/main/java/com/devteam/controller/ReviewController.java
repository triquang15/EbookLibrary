package com.devteam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devteam.common.ExtractJWT;
import com.devteam.common.ReviewRequest;
import com.devteam.service.ReviewService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
	@Autowired
	private ReviewService reviewService;

	@PostMapping("/secure")
	public void postReview(@RequestHeader(value = "Authorization") String token,
			@RequestBody ReviewRequest reviewRequest) throws Exception {
		String email = ExtractJWT.payloadJWT(token, "\"sub\"");
		if (email == null) {
			throw new Exception("User email is missing");
		}

		reviewService.postReview(email, reviewRequest);
	}

	@GetMapping("/secure/user/book")
	public Boolean reviewBookByUser(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId)
			throws Exception {
		String email = ExtractJWT.payloadJWT(token, "\"sub\"");

		if (email == null) {
			throw new Exception("User email is missing");
		}

		return reviewService.userReviewListed(email, bookId);
	}
}
