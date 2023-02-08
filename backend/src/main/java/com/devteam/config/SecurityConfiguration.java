package com.devteam.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

import com.okta.spring.boot.oauth.Okta;

@Configuration
public class SecurityConfiguration {

	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {

		httpSecurity.csrf().disable();
		httpSecurity.authorizeRequests(config -> config.antMatchers("/api/books/checkout/**")
				.authenticated())
				.oauth2ResourceServer()
				.jwt();
		
		// Add CORS filters
		httpSecurity.cors();
		
		// Add content negotiation strategy
		httpSecurity.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());
		
		Okta.configureResourceServer401ResponseBody(httpSecurity);

		return httpSecurity.build();

	}
}
