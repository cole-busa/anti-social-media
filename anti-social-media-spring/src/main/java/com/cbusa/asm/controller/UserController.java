package com.cbusa.asm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbusa.asm.domain.Friend;
import com.cbusa.asm.domain.User;
import com.cbusa.asm.service.FriendService;
import com.cbusa.asm.service.UserService;

@RestController
@RequestMapping("/User")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private FriendService friendService;

	@GetMapping("/")
	public Iterable<User> getAllUsers() {
		return userService.listAll();
	}

	@GetMapping("/Name/{username}")
	public User getUserByName(@PathVariable String username) {
		return userService.findUserByName(username).get();
	}

	@GetMapping("/Id/{id}")
	public User getUserById(@PathVariable Integer id) {
		return userService.findUserById(id).get();
	}

	@PutMapping("/Id/{id}/{newFriend}")
	public void addFriend(@PathVariable Integer id, @PathVariable String newFriend) {
		Optional<User> optionalUser = userService.findUserById(id);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			Friend friend = new Friend(user, newFriend);
			if (!friendService.findFriendByUser(user).contains(friend)) {
				user.addFriend(friend);
				userService.updateUser(user);
			}
		}
	}

	@PostMapping("/")
	public void createUser (@RequestBody User user) {
		userService.addUser(user);
	}
}