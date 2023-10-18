package com.cbusa.asm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbusa.asm.domain.UserVideoGame;
import com.cbusa.asm.repository.UserVideoGameRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserVideoGameService {
    @Autowired
    private UserVideoGameRepository userVideoGameRepository;

    public List<UserVideoGame> listAll() {
        return userVideoGameRepository.findAll();
    }

    public List<UserVideoGame> findUserVideoGameByUserId(Integer id) {
        return userVideoGameRepository.findByUserId(id);
    }

    public Optional<UserVideoGame> findUserVideoGameByUserIdAndVideoGameId(Integer userId, Integer videoGameId) {
        return userVideoGameRepository.findByUserIdAndVideoGameId(userId, videoGameId);
    }

    public void addUserVideoGame(UserVideoGame userVideoGame) {
		userVideoGameRepository.save(userVideoGame);
	}

	public void updateUserVideoGame(UserVideoGame userVideoGame) {
		userVideoGameRepository.save(userVideoGame);
	}

    public void deleteUserVideoGame(UserVideoGame userVideoGame) {
		userVideoGameRepository.delete(userVideoGame);
	}
}
