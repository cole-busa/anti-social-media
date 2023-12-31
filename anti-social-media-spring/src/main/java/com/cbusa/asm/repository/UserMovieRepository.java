package com.cbusa.asm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbusa.asm.domain.UserMovie;

@Repository
public interface UserMovieRepository extends JpaRepository<UserMovie, Integer>{
    List<UserMovie> findByUserId(Integer userId);
    Optional<UserMovie> findByUserIdAndMovieId(Integer userId, Integer movieId);
}
