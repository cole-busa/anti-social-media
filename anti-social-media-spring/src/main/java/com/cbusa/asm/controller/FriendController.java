package com.cbusa.asm.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbusa.asm.domain.Friend;
import com.cbusa.asm.domain.User;
import com.cbusa.asm.service.FriendService;
import com.cbusa.asm.service.UserService;

@RestController
@RequestMapping("/Friend")
@CrossOrigin(origins = "http://localhost:3000")
public class FriendController {
    @Autowired
	private UserService userService;

	@Autowired
	private FriendService friendService;

    @GetMapping("/{username}")
	public List<Friend> getFriendsByUser(@PathVariable String username) {
		return friendService.findFriendByUser(username);
	}

    @PostMapping("/{username}/{friendName}")
    public void createFriend (@PathVariable String username, @PathVariable String friendName) {
        Optional<User> optionalUser = userService.findUserByName(username);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			Friend friend = new Friend(user, friendName);
			if (!friendService.findFriendByUser(user.getUsername()).contains(friend)) {
				friendService.addFriend(friend);
			}
		}
    }
}
