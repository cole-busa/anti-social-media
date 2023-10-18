package com.cbusa.asm.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbusa.asm.domain.UserVideoGame;

@Repository
public interface UserVideoGameRepository extends JpaRepository<UserVideoGame, Integer>{
    List<UserVideoGame> findByUserId(Integer userId);
    Optional<UserVideoGame> findByUserIdAndVideoGameId(Integer userId, Integer videoGameId);
}