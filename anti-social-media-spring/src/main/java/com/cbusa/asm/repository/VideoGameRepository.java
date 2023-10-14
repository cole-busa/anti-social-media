package com.cbusa.asm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbusa.asm.domain.VideoGame;

@Repository
public interface VideoGameRepository extends JpaRepository<VideoGame, Integer>{
    public Optional<VideoGame> findByTitle(String title);
}