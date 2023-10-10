package com.cbusa.asm.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;

    @OneToMany
    @JoinColumn(name = "User_Id")
    private List<Friend> friends;

    public User() {
        this.username = "";
        this.password = "";
        this.friends = new ArrayList<Friend>();
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.friends = new ArrayList<Friend>();
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

    public List<Friend> getFriends() {
        return this.friends;
    }

    public void setFriends(List<Friend> friends) {
        this.friends = friends;
    }

    public void addFriend(Friend friend) {
        friends.add(friend);
    }
}
