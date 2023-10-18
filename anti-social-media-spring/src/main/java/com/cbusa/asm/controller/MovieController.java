package com.cbusa.asm.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbusa.asm.domain.Movie;
import com.cbusa.asm.domain.User;
import com.cbusa.asm.domain.UserMovie;
import com.cbusa.asm.service.MovieService;
import com.cbusa.asm.service.UserService;

@RestController
@RequestMapping("/Movie")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {
    @Autowired
    public MovieService movieService;

	@Autowired
	public UserService userService;

    @GetMapping("/")
	public Iterable<Movie> getAllMovies() {
		return movieService.listAll();
	}

    @GetMapping("/Title/{title}")
	public Movie getMovieByTitle(@PathVariable String title) {
		return movieService.findMovieByTitle(title).get();
	}

	@GetMapping("/Id/{id}")
	public Movie getMovieById(@PathVariable Integer id) {
		return movieService.findMovieById(id).get();
	}

	@PutMapping("/AddUserMovies/{username}/{title}")
	public void addUserMovie(@PathVariable String username, @PathVariable String title) {
		Optional<User> optionalUser = userService.findUserByName(username);
		Optional<Movie> optionalMovie = movieService.findMovieByTitle(title);
		if (optionalUser.isPresent() && optionalMovie.isPresent()) {
			User user = optionalUser.get();
			Movie movie = optionalMovie.get();
			UserMovie userMovie = new UserMovie(user, movie);
			movie.addUserMovie(userMovie);
		}
	}

	@PutMapping("/DeleteUserMovies/{username}/{title}")
	public void deleteUserMovie(@PathVariable String username, @PathVariable String title) {
		Optional<User> optionalUser = userService.findUserByName(username);
		Optional<Movie> optionalMovie = movieService.findMovieByTitle(title);
		if (optionalUser.isPresent() && optionalMovie.isPresent()) {
			User user = optionalUser.get();
			Movie movie = optionalMovie.get();
			UserMovie userMovie = new UserMovie(user, movie);
			movie.removeUserMovie(userMovie);
		}
	}
}
