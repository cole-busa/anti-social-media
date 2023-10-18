package com.cbusa.asm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbusa.asm.domain.TVShow;
import com.cbusa.asm.domain.User;
import com.cbusa.asm.domain.UserTVShow;
import com.cbusa.asm.service.TVShowService;
import com.cbusa.asm.service.UserService;

@RestController
@RequestMapping("/TVShow")
@CrossOrigin(origins = "http://localhost:3000")
public class TVShowController {
    @Autowired
    public TVShowService tvShowService;

	@Autowired
	public UserService userService;

    @GetMapping("/")
	public Iterable<TVShow> getAllTVShows() {
		return tvShowService.listAll();
	}

    @GetMapping("/Title/{title}")
	public TVShow getTVShowByTitle(@PathVariable String title) {
		return tvShowService.findTVShowByTitle(title).get();
	}

	@GetMapping("/Id/{id}")
	public TVShow getTVShowById(@PathVariable Integer id) {
		return tvShowService.findTVShowById(id).get();
	}

	@PutMapping("/AddUserTVShows/{username}/{title}")
	public void addUserTVShow(@PathVariable String username, @PathVariable String title) {
		Optional<User> optionalUser = userService.findUserByName(username);
		Optional<TVShow> optionalTVShow = tvShowService.findTVShowByTitle(title);
		if (optionalUser.isPresent() && optionalTVShow.isPresent()) {
			User user = optionalUser.get();
			TVShow tvShow = optionalTVShow.get();
			UserTVShow userTVShow = new UserTVShow(user, tvShow);
			tvShow.addUserTVShow(userTVShow);
		}
	}

	@PutMapping("/DeleteUserTVShows/{username}/{title}")
	public void deleteUserTVShow(@PathVariable String username, @PathVariable String title) {
		Optional<User> optionalUser = userService.findUserByName(username);
		Optional<TVShow> optionalTVShow = tvShowService.findTVShowByTitle(title);
		if (optionalUser.isPresent() && optionalTVShow.isPresent()) {
			User user = optionalUser.get();
			TVShow tvShow = optionalTVShow.get();
			UserTVShow userTVShow = new UserTVShow(user, tvShow);
			tvShow.removeUserTVShow(userTVShow);
		}
	}
}
