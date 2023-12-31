package com.cbusa.asm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbusa.asm.domain.UserMovie;
import com.cbusa.asm.repository.UserMovieRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserMovieService {
    @Autowired
    private UserMovieRepository userMovieRepository;

    public List<UserMovie> listAll() {
        return userMovieRepository.findAll();
    }

    public List<UserMovie> findUserMovieByUserId(Integer id) {
        return userMovieRepository.findByUserId(id);
    }

    public Optional<UserMovie> findUserMovieByUserIdAndMovieId(Integer userId, Integer movieId) {
        return userMovieRepository.findByUserIdAndMovieId(userId, movieId);
    }

    public void addUserMovie(UserMovie userMovie) {
		userMovieRepository.save(userMovie);
	}

	public void updateUserMovie(UserMovie userMovie) {
		userMovieRepository.save(userMovie);
	}

    public void deleteUserMovie(UserMovie userMovie) {
        userMovieRepository.delete(userMovie);
    }
}
