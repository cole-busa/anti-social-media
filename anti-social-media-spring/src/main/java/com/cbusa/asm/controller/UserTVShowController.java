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

import com.cbusa.asm.domain.TVShow;
import com.cbusa.asm.domain.User;
import com.cbusa.asm.domain.UserTVShow;
import com.cbusa.asm.service.TVShowService;
import com.cbusa.asm.service.UserService;
import com.cbusa.asm.service.UserTVShowService;

@RestController
@RequestMapping("/UserTVShow")
@CrossOrigin(origins = "http://localhost:3000")
public class UserTVShowController {
    @Autowired
    private UserTVShowService userTVShowService;
    
    @Autowired
    private UserService userService;

    @Autowired
    private TVShowService tvShowService;

    @GetMapping("/")
    public List<UserTVShow> getAllUserTVShows() {
        return userTVShowService.listAll();
    }

    @GetMapping("/Id/{userId}")
	public List<UserTVShow> getUserTVShowByUserId(@PathVariable Integer userId) {
		return userTVShowService.findUserTVShowByUserId(userId);
	}

    @PostMapping("{username}/{title}")
    public void addUserTVShow(@PathVariable String username, @PathVariable String title) {
        Optional<User> optionalUser = userService.findUserByName(username);
		Optional<TVShow> optionalTVShow = tvShowService.findTVShowByTitle(title);
		if (optionalUser.isPresent() && optionalTVShow.isPresent()) {
			User user = optionalUser.get();
			TVShow tvShow = optionalTVShow.get();
			List<UserTVShow> userTVShows = userTVShowService.findUserTVShowByUserId(user.getId());
			boolean match = false;
			for (int i = 0; i < userTVShows.size(); i++) {
				if (userTVShows.get(i).getTVShow().equals(tvShow)) {
					match = true;
				}
			}
			if (!match) {
				UserTVShow userTVShow = new UserTVShow(user, tvShow);
				userTVShowService.addUserTVShow(userTVShow);
			}
		}
    }
}
