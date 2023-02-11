package com.devteam.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

import com.okta.spring.boot.oauth.Okta;

@Configuration
public class SecurityConfiguration {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

		httpSecurity.csrf().disable();
		httpSecurity.authorizeRequests(
				config -> config.antMatchers("/api/books/checkout/**", "/api/reviews/secure/**", "/api/messages/secure/**")
				.authenticated())
				.oauth2ResourceServer().jwt();

		// Add CORS filters
		httpSecurity.cors();

		// Add content negotiation strategy
		httpSecurity.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

		// Force a non-empty response body for 401's to make the response friendly
		Okta.configureResourceServer401ResponseBody(httpSecurity);

		return httpSecurity.build();

	}
}
