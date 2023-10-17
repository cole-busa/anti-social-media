package com.cbusa.asm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbusa.asm.domain.UserTVShow;

@Repository
public interface UserTVShowRepository extends JpaRepository<UserTVShow, Integer>{
    List<UserTVShow> findByUserId(Integer userId);
}