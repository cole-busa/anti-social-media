package com.cbusa.asm.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cbusa.asm.domain.User;
import com.cbusa.asm.repository.UserRepository;

@Service
@Transactional
public class UserService {
    @Autowired
	private UserRepository userRepository;

    public Iterable<User> listAll() {
		return userRepository.findAll();
	}

	public Optional<User> findUserByName(String username) {
		return userRepository.findByUsername(username);
	}

	public Optional<User> findUserById(Integer id) {
		return userRepository.findById(id);
	}

	public void addUser(User user) {
		userRepository.save(user);
	}

	public void updateUser(User user) {
		userRepository.save(user);
	}
}
