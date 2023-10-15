package com.cbusa.asm.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "TVShow")
public class TVShow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Title")
    private String title;

    @Column(name = "Runtime")
    private String runtime;

    @OneToMany(mappedBy = "tvShow")
    private List<UserTVShow> userTVShows;

    public TVShow() {
        this.title = "";
        this.runtime = "";
        this.userTVShows = new ArrayList<UserTVShow>();
    }

    public TVShow(String title, String runtime) {
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

    public List<UserTVShow> getUserTVShows() {
        return this.userTVShows;
    }

    public void setUserTVShows(List<UserTVShow> userTVShows) {
        this.userTVShows = userTVShows;
    }

    public void addUserTVShow(UserTVShow userTVShow) {
        userTVShows.add(userTVShow);
    }
}
