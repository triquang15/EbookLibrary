package com.devteam.service;

import java.sql.Date;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devteam.common.ReviewRequest;
import com.devteam.dao.ReviewRepository;
import com.devteam.entity.Review;

@Service
@Transactional
public class ReviewService {

	@Autowired
	private ReviewRepository reviewRepository;

	public void postReview(String email, ReviewRequest reviewRequest) throws Exception {
		Review reviewed = reviewRepository.findByEmailAndBookId(email, reviewRequest.getBookId());
		if (reviewed != null) {
			throw new Exception("Review already posted");
		}

		Review review = new Review();
		review.setBookId(reviewRequest.getBookId());
		review.setRating(reviewRequest.getRating());
		review.setEmail(email);

		if (reviewRequest.getHeadline().isPresent()) {
			review.setHeadline(reviewRequest.getHeadline().map(Object::toString).orElse(null));
		}

		if (reviewRequest.getMessage().isPresent()) {
			review.setMessage(reviewRequest.getMessage().map(Object::toString).orElse(null));
		}

		review.setDate(Date.valueOf(LocalDate.now()));
		reviewRepository.save(review);
	}

	public Boolean userReviewListed(String email, Long bookId) {
		Review reviewed = reviewRepository.findByEmailAndBookId(email, bookId);
		if (reviewed != null) {
			return true;
		} else {
			return false;
		}
	}

}
