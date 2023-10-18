package com.cbusa.asm.domain;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Username")
    private String username;

    @Column(name = "Password")
    private String password;

    @Column(name = "AntiSocialScore")
    private Integer antiSocialScore;

    @OneToMany
    @JoinColumn(name = "UserId")
    private List<Friend> friends;

    @ManyToMany(mappedBy = "user")
    @JsonBackReference
    private List<UserMovie> userMovies;

    @ManyToMany(mappedBy = "user")
    @JsonBackReference
    private List<UserTVShow> userTVShows;

    @ManyToMany(mappedBy = "user")
    @JsonBackReference
    private List<UserVideoGame> userVideoGames;

    public User() {
        this.username = "";
        this.password = "";
        this.antiSocialScore = 0;
        this.friends = new ArrayList<Friend>();
        this.userMovies = new ArrayList<UserMovie>();
        this.userTVShows = new ArrayList<UserTVShow>();
        this.userVideoGames = new ArrayList<UserVideoGame>();
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.antiSocialScore = 0;
        this.friends = new ArrayList<Friend>();
        this.userMovies = new ArrayList<UserMovie>();
        this.userTVShows = new ArrayList<UserTVShow>();
        this.userVideoGames = new ArrayList<UserVideoGame>();
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAntiSocialScore() {
        return this.antiSocialScore;
    }

    public void setAntiSocialScore(Integer antiSocialScore) {
        this.antiSocialScore = antiSocialScore;
    }

    public List<Friend> getFriends() {
        return this.friends;
    }

    public void setFriends(List<Friend> friends) {
        this.friends = friends;
    }

    public void addFriend(Friend friend) {
        friends.add(friend);
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

    public List<UserTVShow> getUserTVShows() {
        return this.userTVShows;
    }

    public void setUserTVShows(List<UserTVShow> userTVShows) {
        this.userTVShows = userTVShows;
    }

    public void addUserTVShow(UserTVShow userTVShow) {
        userTVShows.add(userTVShow);
    }

    public List<UserVideoGame> getUserVideoGames() {
        return this.userVideoGames;
    }

    public void setUserVideoGames(List<UserVideoGame> userVideoGames) {
        this.userVideoGames = userVideoGames;
    }

    public void addUserVideoGame(UserVideoGame userVideoGame) {
        userVideoGames.add(userVideoGame);
    }
}
