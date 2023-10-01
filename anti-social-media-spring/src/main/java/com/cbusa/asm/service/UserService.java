package com.cbusa.asm.service;

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
}
