package com.cbusa.asm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbusa.asm.domain.VideoGame;
import com.cbusa.asm.service.VideoGameService;

@RestController
@RequestMapping("/VideoGame")
@CrossOrigin(origins = "http://localhost:3000")
public class VideoGameController {
    @Autowired
    public VideoGameService videoGameService;

    @GetMapping("/")
	public Iterable<VideoGame> getAllVideoGames() {
		return videoGameService.listAll();
	}

    @GetMapping("/Title/{title}")
	public VideoGame getVideoGameByTitle(@PathVariable String title) {
		return videoGameService.findVideoGameByTitle(title).get();
	}
}
