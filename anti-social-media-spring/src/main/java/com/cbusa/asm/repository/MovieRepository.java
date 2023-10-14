package com.cbusa.asm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbusa.asm.domain.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer>{
    public Optional<Movie> findByTitle(String title);
}
