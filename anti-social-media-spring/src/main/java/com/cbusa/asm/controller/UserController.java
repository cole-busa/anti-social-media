package com.cbusa.asm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cbusa.asm.domain.User;
import com.cbusa.asm.service.UserService;

@RestController
@RequestMapping("/User")
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/")
	@CrossOrigin(origins = "http://localhost:3000")
	public Iterable<User> getAllUsers() {
		return userService.listAll();
	}

	@GetMapping("/Name/{username}")
	@CrossOrigin(origins = "http://localhost:3000")
	public Optional<User> getUserByName(@PathVariable String username) {
		return userService.findUserByName(username);
	}

	@GetMapping("/Id/{id}")
	@CrossOrigin(origins = "http://localhost:3000")
	public Optional<User> getUserById(@PathVariable Integer id) {
		return userService.findUserById(id);
	}

	@PostMapping("/")
	@CrossOrigin(origins = "http://localhost:3000")
	public void createUser (@RequestParam String username, @RequestParam String password) {
		User newUser = new User(username, password);
		userService.addUser(newUser);
	}
}