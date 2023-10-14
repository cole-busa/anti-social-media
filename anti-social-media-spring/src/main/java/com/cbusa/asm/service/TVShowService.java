package com.cbusa.asm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbusa.asm.domain.TVShow;
import com.cbusa.asm.repository.TVShowRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class TVShowService {
    @Autowired
    private TVShowRepository tvShowRepository;

    public Optional<TVShow> findTVShowByTitle(String title) {
        return tvShowRepository.findByTitle(title);
    }

    public void addTVShow(TVShow tvShow) {
		tvShowRepository.save(tvShow);
	}

	public void updateTVShow(TVShow tvShow) {
		tvShowRepository.save(tvShow);
	}
}

