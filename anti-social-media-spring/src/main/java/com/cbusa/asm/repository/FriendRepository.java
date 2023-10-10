package com.cbusa.asm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cbusa.asm.domain.Friend;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Integer>{
    List<Friend> findByUsername(String username);
}
