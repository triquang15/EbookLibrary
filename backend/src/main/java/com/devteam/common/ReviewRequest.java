package com.devteam.common;

import java.util.Optional;

import lombok.Data;

@Data
public class ReviewRequest {
	private double rating;
	private Long bookId;
	private Optional<String> headline;
	private Optional<String> message;
	
}
