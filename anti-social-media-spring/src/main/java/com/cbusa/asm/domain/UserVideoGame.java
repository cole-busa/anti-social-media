package com.cbusa.asm.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "UserVideoGame")
public class UserVideoGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "UserId")
    @JsonManagedReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "VideoGameId")
    @JsonManagedReference
    private VideoGame videoGame;

    public UserVideoGame() {
        
    }

    public UserVideoGame(User user, VideoGame videoGame) {
        this.user = user;
        this.videoGame = videoGame;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public VideoGame getVideoGame() {
        return this.videoGame;
    }

    public void setVideoGame(VideoGame videoGame) {
        this.videoGame = videoGame;
    }
}
