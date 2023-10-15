package com.cbusa.asm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbusa.asm.domain.TVShow;
import com.cbusa.asm.service.TVShowService;

@RestController
@RequestMapping("/TVShow")
@CrossOrigin(origins = "http://localhost:3000")
public class TVShowController {
    @Autowired
    public TVShowService tvShowService;

    @GetMapping("/")
	public Iterable<TVShow> getAllTVShows() {
		return tvShowService.listAll();
	}

    @GetMapping("/Title/{title}")
	public TVShow getTVShowByTitle(@PathVariable String title) {
		return tvShowService.findTVShowByTitle(title).get();
	}

	@GetMapping("/Id/{id}")
	public TVShow getTVShowById(@PathVariable Integer id) {
		return tvShowService.findTVShowById(id).get();
	}
}
