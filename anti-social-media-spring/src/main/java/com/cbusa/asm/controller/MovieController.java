package com.cbusa.asm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbusa.asm.domain.Movie;
import com.cbusa.asm.service.MovieService;

@RestController
@RequestMapping("/Movie")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {
    @Autowired
    public MovieService movieService;

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
}
