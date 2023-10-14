package com.cbusa.asm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbusa.asm.domain.TVShow;

@Repository
public interface TVShowRepository extends JpaRepository<TVShow, Integer>{
    public Optional<TVShow> findByTitle(String title);
}