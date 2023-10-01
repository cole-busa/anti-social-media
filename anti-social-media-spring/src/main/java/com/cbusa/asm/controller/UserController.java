package com.cbusa.asm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbusa.asm.domain.User;
import com.cbusa.asm.service.UserService;

@RestController
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/")
	public Iterable<User> getUsers() {
		return userService.listAll();
	}
}