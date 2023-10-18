package com.cbusa.asm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbusa.asm.domain.User;
import com.cbusa.asm.domain.UserVideoGame;
import com.cbusa.asm.domain.VideoGame;
import com.cbusa.asm.service.UserService;
import com.cbusa.asm.service.VideoGameService;

@RestController
@RequestMapping("/VideoGame")
@CrossOrigin(origins = "http://localhost:3000")
public class VideoGameController {
    @Autowired
    public VideoGameService videoGameService;

	@Autowired
	public UserService userService;

    @GetMapping("/")
	public Iterable<VideoGame> getAllVideoGames() {
		return videoGameService.listAll();
	}

    @GetMapping("/Title/{title}")
	public VideoGame getVideoGameByTitle(@PathVariable String title) {
		return videoGameService.findVideoGameByTitle(title).get();
	}

	@GetMapping("/Id/{id}")
	public VideoGame getVideoGameById(@PathVariable Integer id) {
		return videoGameService.findVideoGameById(id).get();
	}

	@PutMapping("/AddUserVideoGames/{username}/{title}")
	public void addUserVideoGame(@PathVariable String username, @PathVariable String title) {
		Optional<User> optionalUser = userService.findUserByName(username);
		Optional<VideoGame> optionalVideoGame = videoGameService.findVideoGameByTitle(title);
		if (optionalUser.isPresent() && optionalVideoGame.isPresent()) {
			User user = optionalUser.get();
			VideoGame videoGame = optionalVideoGame.get();
			UserVideoGame userVideoGame = new UserVideoGame(user, videoGame);
			videoGame.addUserVideoGame(userVideoGame);
		}
	}

	@PutMapping("/DeleteUserVideoGames/{username}/{title}")
	public void deleteUserVideoGame(@PathVariable String username, @PathVariable String title) {
		Optional<User> optionalUser = userService.findUserByName(username);
		Optional<VideoGame> optionalVideoGame = videoGameService.findVideoGameByTitle(title);
		if (optionalUser.isPresent() && optionalVideoGame.isPresent()) {
			User user = optionalUser.get();
			VideoGame videoGame = optionalVideoGame.get();
			UserVideoGame userVideoGame = new UserVideoGame(user, videoGame);
			videoGame.removeUserVideoGame(userVideoGame);
		}
	}
}
