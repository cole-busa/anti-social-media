package com.cbusa.asm.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Friend")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Username")
    private String username;

    @Column(name = "Friendname")
    private String friendName;

    @Column(name = "User_Id")
    private Integer userId;

    public Friend() {
        this.username = "";
        this.friendName = "";
    }

    public Friend(User user, String friendName) {
        this.username = user.getUsername();
        this.userId = user.getId();
        this.friendName = friendName;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUser(String username) {
        this.username = username;
    }

    public String getFriendName() {
        return this.friendName;
    }

    public void setFriendName(String friendName) {
        this.friendName = friendName;
    }
}
