package com.cbusa.asm.controller;

import java.util.List;
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
import com.cbusa.asm.domain.UserMovie;
import com.cbusa.asm.domain.UserTVShow;
import com.cbusa.asm.domain.UserVideoGame;
import com.cbusa.asm.service.FriendService;
import com.cbusa.asm.service.UserMovieService;
import com.cbusa.asm.service.UserService;
import com.cbusa.asm.service.UserTVShowService;
import com.cbusa.asm.service.UserVideoGameService;

@RestController
@RequestMapping("/User")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private FriendService friendService;

	@Autowired
	private UserMovieService userMovieService;

	@Autowired
	private UserTVShowService userTVShowService;

	@Autowired
	private UserVideoGameService userVideoGameService;

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

	@GetMapping("/UserMovie/{userId}")
	public List<UserMovie> getUserMovieByUserId(@PathVariable Integer userId) {
		return userMovieService.findUserMovieByUserId(userId);
	}

	@GetMapping("/UserTVShow/{userId}")
	public List<UserTVShow> getUserTVShowByUserId(@PathVariable Integer userId) {
		return userTVShowService.findUserTVShowByUserId(userId);
	}

	@GetMapping("/UserVideoGame/{userId}")
	public List<UserVideoGame> getUserVideoGameByUserId(@PathVariable Integer userId) {
		return userVideoGameService.findUserVideoGameByUserId(userId);
	}

	@PutMapping("/Friends/{username}/{newFriend}")
	public void addFriend(@PathVariable String username, @PathVariable String newFriend) {
		Optional<User> optionalUser = userService.findUserByName(username);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			Friend friend = new Friend(user, newFriend);
			if (!friendService.findFriendByUser(user.getUsername()).contains(friend)) {
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