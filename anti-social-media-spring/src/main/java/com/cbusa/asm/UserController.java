package com.cbusa.asm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/")
	public Iterable<User> getUsers() {
		return userRepository.findAll();
	}

}