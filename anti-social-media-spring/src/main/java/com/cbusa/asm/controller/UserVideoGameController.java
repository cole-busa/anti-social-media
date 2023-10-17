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

import com.cbusa.asm.domain.User;
import com.cbusa.asm.domain.UserVideoGame;
import com.cbusa.asm.domain.VideoGame;
import com.cbusa.asm.service.UserService;
import com.cbusa.asm.service.UserVideoGameService;
import com.cbusa.asm.service.VideoGameService;

@RestController
@RequestMapping("/UserVideoGame")
@CrossOrigin(origins = "http://localhost:3000")
public class UserVideoGameController {
    @Autowired
    private UserVideoGameService userVideoGameService;
    
    @Autowired
    private UserService userService;

    @Autowired
    private VideoGameService videoGameService;

    @GetMapping("/")
    public List<UserVideoGame> getAllUserVideoGames() {
        return userVideoGameService.listAll();
    }

    @GetMapping("/Id/{userId}")
	public List<UserVideoGame> getUserVideoGameByUserId(@PathVariable Integer userId) {
		return userVideoGameService.findUserVideoGameByUserId(userId);
	}

    @PostMapping("{username}/{title}")
    public void addUserVideoGame(@PathVariable String username, @PathVariable String title) {
        Optional<User> optionalUser = userService.findUserByName(username);
		Optional<VideoGame> optionalVideoGame = videoGameService.findVideoGameByTitle(title);
		if (optionalUser.isPresent() && optionalVideoGame.isPresent()) {
			User user = optionalUser.get();
			VideoGame videoGame = optionalVideoGame.get();
			List<UserVideoGame> userVideoGames = userVideoGameService.findUserVideoGameByUserId(user.getId());
			boolean match = false;
			for (int i = 0; i < userVideoGames.size(); i++) {
				if (userVideoGames.get(i).getVideoGame().equals(videoGame)) {
					match = true;
				}
			}
			if (!match) {
				UserVideoGame userVideoGame = new UserVideoGame(user, videoGame);
				userVideoGameService.addUserVideoGame(userVideoGame);
			}
		}
    }
}
