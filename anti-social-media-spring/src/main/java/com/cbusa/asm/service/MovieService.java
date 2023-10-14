package com.cbusa.asm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbusa.asm.domain.Movie;
import com.cbusa.asm.repository.MovieRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public Optional<Movie> findMovieByTitle(String title) {
        return movieRepository.findByTitle(title);
    }

    public void addMovie(Movie movie) {
		movieRepository.save(movie);
	}

	public void updateMovie(Movie movie) {
		movieRepository.save(movie);
	}
}
