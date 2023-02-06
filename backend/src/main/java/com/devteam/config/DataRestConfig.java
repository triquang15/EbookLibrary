package com.devteam.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.devteam.entity.Book;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {
	private String theAllowedOrigins = "http://localhost:3000";
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration configurer, CorsRegistry corsRegistry) {
		HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.PATCH, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PUT};
		
		configurer.exposeIdsFor(Book.class);
		
		disableHttpMethods(Book.class, configurer, theUnsupportedActions);
		
		/* Configure CORS Mapping */
		corsRegistry.addMapping(configurer.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);
	}

	private void disableHttpMethods(Class<Book> theClass, RepositoryRestConfiguration configurer,
			HttpMethod[] theUnsupportedActions) {
		
		configurer.getExposureConfiguration()
				  .forDomainType(theClass)
				  .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
				  .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
	}

}
