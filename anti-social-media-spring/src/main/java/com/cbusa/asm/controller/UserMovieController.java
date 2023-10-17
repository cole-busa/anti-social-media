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

import com.cbusa.asm.domain.Movie;
import com.cbusa.asm.domain.User;
import com.cbusa.asm.domain.UserMovie;
import com.cbusa.asm.service.MovieService;
import com.cbusa.asm.service.UserMovieService;
import com.cbusa.asm.service.UserService;

@RestController
@RequestMapping("/UserMovie")
@CrossOrigin(origins = "http://localhost:3000")
public class UserMovieController {
    @Autowired
    private UserMovieService userMovieService;
    
    @Autowired
    private UserService userService;

    @Autowired
    private MovieService movieService;

    @GetMapping("/")
    public List<UserMovie> getAllUserMovies() {
        return userMovieService.listAll();
    }

    @GetMapping("/Id/{userId}")
	public List<UserMovie> getUserMovieByUserId(@PathVariable Integer userId) {
		return userMovieService.findUserMovieByUserId(userId);
	}

    @PostMapping("{username}/{title}")
    public void addUserMovie(@PathVariable String username, @PathVariable String title) {
        Optional<User> optionalUser = userService.findUserByName(username);
		Optional<Movie> optionalMovie = movieService.findMovieByTitle(title);
		if (optionalUser.isPresent() && optionalMovie.isPresent()) {
			User user = optionalUser.get();
			Movie movie = optionalMovie.get();
			List<UserMovie> userMovies = userMovieService.findUserMovieByUserId(user.getId());
			boolean match = false;
			for (int i = 0; i < userMovies.size(); i++) {
				if (userMovies.get(i).getMovie().equals(movie)) {
					match = true;
				}
			}
			if (!match) {
				UserMovie userMovie = new UserMovie(user, movie);
				userMovieService.addUserMovie(userMovie);
			}
		}
    }
}
