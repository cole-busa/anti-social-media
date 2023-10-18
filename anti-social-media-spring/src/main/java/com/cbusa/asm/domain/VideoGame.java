package com.cbusa.asm.domain;

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
@Table(name = "VideoGame")
public class VideoGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Playtime")
    private String playtime;

    @ManyToMany(mappedBy = "videoGame")
    @JsonBackReference
    private List<UserVideoGame> userVideoGames;

    public VideoGame() {
        this.title = "";
        this.playtime = "";
    }

    public VideoGame(String title, String playtime) {
        this.title = title;
        this.playtime = playtime;
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

    public String getPlaytime() {
        return this.playtime;
    }

    public void setPlaytime(String playtime) {
        this.playtime = playtime;
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
