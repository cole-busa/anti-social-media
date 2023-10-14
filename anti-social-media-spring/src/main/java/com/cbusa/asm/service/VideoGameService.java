package com.cbusa.asm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbusa.asm.domain.VideoGame;
import com.cbusa.asm.repository.VideoGameRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class VideoGameService {
    @Autowired
    private VideoGameRepository videoGameRepository;

    public Optional<VideoGame> findVideoGameByTitle(String title) {
        return videoGameRepository.findByTitle(title);
    }

    public void addVideoGame(VideoGame videoGame) {
		videoGameRepository.save(videoGame);
	}

	public void updateVideoGame(VideoGame videoGame) {
		videoGameRepository.save(videoGame);
	}
}