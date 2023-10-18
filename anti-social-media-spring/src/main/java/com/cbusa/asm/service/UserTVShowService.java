package com.cbusa.asm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbusa.asm.domain.UserTVShow;
import com.cbusa.asm.repository.UserTVShowRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserTVShowService {
    @Autowired
    private UserTVShowRepository userTVShowRepository;

    public List<UserTVShow> listAll() {
        return userTVShowRepository.findAll();
    }

    public List<UserTVShow> findUserTVShowByUserId(Integer id) {
        return userTVShowRepository.findByUserId(id);
    }

    public Optional<UserTVShow> findUserTVShowByUserIdAndTVShowId(Integer userId, Integer tvShowId) {
        return userTVShowRepository.findByUserIdAndTvShowId(userId, tvShowId);
    }

    public void addUserTVShow(UserTVShow userTVShow) {
		userTVShowRepository.save(userTVShow);
	}

	public void updateUserTVShow(UserTVShow userTVShow) {
		userTVShowRepository.save(userTVShow);
	}

    public void deleteUserTVShow(UserTVShow userTVShow) {
		userTVShowRepository.delete(userTVShow);
	}
}
