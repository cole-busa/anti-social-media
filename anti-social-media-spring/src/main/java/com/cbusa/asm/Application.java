package com.cbusa.asm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories( "com.cbusa.asm.**")
@ComponentScan(basePackages = { "com.cbusa.asm.**"})
@EntityScan( "com.cbusa.asm.**" )
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
