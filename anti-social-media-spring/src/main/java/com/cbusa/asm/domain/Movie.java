package com.cbusa.asm.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Runtime")
    private String runtime;

    @ManyToMany(mappedBy = "movie")
    @JsonBackReference
    private List<UserMovie> userMovies;

    public Movie() {
        this.title = "";
        this.runtime = "";
        this.userMovies = new ArrayList<UserMovie>();
    }

    public Movie(String title, String runtime) {
        this.title = title;
        this.runtime = runtime;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRuntime() {
        return this.runtime;
    }

    public void setRuntime(String runtime) {
        this.runtime = runtime;
    }
    
    public List<UserMovie> getUserMovies() {
        return this.userMovies;
    }

    public void setUserMovies(List<UserMovie> userMovies) {
        this.userMovies = userMovies;
    }

    public void addUserMovie(UserMovie userMovie) {
        userMovies.add(userMovie);
    }

    public void removeUserMovie(UserMovie userMovie) {
        userMovies.remove(userMovie);
    }
}
