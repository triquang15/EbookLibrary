package com.devteam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devteam.common.ExtractJWT;
import com.devteam.common.PaymentRequest;
import com.devteam.service.PaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/payment/secure")
public class PaymentController {
	@Autowired
	private PaymentService paymentService;

	@PostMapping("/payment-intent")
	public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentRequest paymentRequest)
			throws StripeException {
		PaymentIntent paymentIntent = paymentService.createPaymentIntent(paymentRequest);
		String paymentStr = paymentIntent.toJson();

		return new ResponseEntity<>(paymentStr, HttpStatus.OK);
	}

	@PutMapping("/payment-complete")
	public ResponseEntity<String> stripePaymentComplete(@RequestHeader(value = "Authorization") String token)
			throws Exception {
		String userEmail = ExtractJWT.payloadJWT(token, "\"sub\"");
		if (userEmail == null) {
			throw new Exception("User email is missing");
		}

		return paymentService.stripePayment(userEmail);
	}
}
