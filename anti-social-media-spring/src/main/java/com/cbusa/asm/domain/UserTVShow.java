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
@Table(name = "UserTVShow")
public class UserTVShow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "UserId")
    @JsonManagedReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "TVShowId")
    @JsonManagedReference
    private TVShow tvShow;

    public UserTVShow() {
        
    }

    public UserTVShow(User user, TVShow tvShow) {
        this.user = user;
        this.tvShow = tvShow;
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

    public TVShow getTVShow() {
        return this.tvShow;
    }

    public void setTVShow(TVShow tvShow) {
        this.tvShow = tvShow;
    }
}
