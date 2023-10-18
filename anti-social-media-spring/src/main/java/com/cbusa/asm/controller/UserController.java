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
import com.cbusa.asm.domain.Movie;
import com.cbusa.asm.domain.TVShow;
import com.cbusa.asm.domain.User;
import com.cbusa.asm.domain.UserMovie;
import com.cbusa.asm.domain.UserTVShow;
import com.cbusa.asm.domain.UserVideoGame;
import com.cbusa.asm.domain.VideoGame;
import com.cbusa.asm.service.MovieService;
import com.cbusa.asm.service.TVShowService;
import com.cbusa.asm.service.UserService;
import com.cbusa.asm.service.VideoGameService;

@RestController
@RequestMapping("/User")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	@Autowired
	private UserService userService;

	@Autowired
	private MovieService movieService;

	@Autowired
	private VideoGameService videoGameService;

	@Autowired
	private TVShowService tvShowService;

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

	@PutMapping("/Score/{username}/{antiSocialScore}")
	public void setAntiSocialScore(@PathVariable String username, @PathVariable Integer antiSocialScore) {
		Optional<User> optionalUser = userService.findUserByName(username);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			user.setAntiSocialScore(antiSocialScore);
			userService.updateUser(user);
		}
	}

	@PutMapping("/Friends/{username}/{newFriend}")
	public void addFriend(@PathVariable String username, @PathVariable String newFriend) {
		Optional<User> optionalUser = userService.findUserByName(username);
		if (optionalUser.isPresent()) {
			User user = optionalUser.get();
			Friend friend = new Friend(user, newFriend);
			user.addFriend(friend);
			userService.updateUser(user);
		}
	}

	@PutMapping("/AddUserMovies/{username}/{title}")
	public void addUserMovie(@PathVariable String username, @PathVariable String title) {
		Optional<User> optionalUser = userService.findUserByName(username);
		Optional<Movie> optionalMovie = movieService.findMovieByTitle(title);
		if (optionalUser.isPresent() && optionalMovie.isPresent()) {
			User user = optionalUser.get();
			Movie movie = optionalMovie.get();
			UserMovie userMovie = new UserMovie(user, movie);
			user.addUserMovie(userMovie);
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
			user.removeUserMovie(userMovie);
		}
	}

	@PutMapping("/AddUserVideoGames/{username}/{title}")
	public void addUserVideoGame(@PathVariable String username, @PathVariable String title) {
		Optional<User> optionalUser = userService.findUserByName(username);
		Optional<VideoGame> optionalVideoGame = videoGameService.findVideoGameByTitle(title);
		if (optionalUser.isPresent() && optionalVideoGame.isPresent()) {
			User user = optionalUser.get();
			VideoGame videoGame = optionalVideoGame.get();
			UserVideoGame userVideoGame = new UserVideoGame(user, videoGame);
			user.addUserVideoGame(userVideoGame);
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
			user.removeUserVideoGame(userVideoGame);
		}
	}

	@PutMapping("/AddUserTVShows/{username}/{title}")
	public void addUserTVShow(@PathVariable String username, @PathVariable String title) {
		Optional<User> optionalUser = userService.findUserByName(username);
		Optional<TVShow> optionalTVShow = tvShowService.findTVShowByTitle(title);
		if (optionalUser.isPresent() && optionalTVShow.isPresent()) {
			User user = optionalUser.get();
			TVShow tvShow = optionalTVShow.get();
			UserTVShow userTVShow = new UserTVShow(user, tvShow);
			user.addUserTVShow(userTVShow);
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
			user.removeUserTVShow(userTVShow);
		}
	}

	@PostMapping("/")
	public void createUser (@RequestBody User user) {
		userService.addUser(user);
	}
}