package com.backend.coursescheduler;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer{

    @Override
    public void addCorsMappings(CorsRegistry cors){
        cors.addMapping("/api***")
                .allowedOrigins("http://localhost:3001")
                .allowedMethods("GET")
                .allowedHeaders("*");
    }
}
