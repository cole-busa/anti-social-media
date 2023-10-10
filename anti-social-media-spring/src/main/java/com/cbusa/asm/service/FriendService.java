package com.cbusa.asm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbusa.asm.domain.Friend;
import com.cbusa.asm.repository.FriendRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FriendService {
    @Autowired
    private FriendRepository friendRepository;

    public List<Friend> findFriendByUser(String username) {
        return friendRepository.findByUsername(username);
    }

    public void addFriend(Friend friend) {
		friendRepository.save(friend);
	}

	public void updateFriend(Friend friend) {
		friendRepository.save(friend);
	}
}
