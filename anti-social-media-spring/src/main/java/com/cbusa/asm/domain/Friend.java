package com.cbusa.asm.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Friend")
public class Friend {

    @OneToMany
    private User user;
    private String friend;

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFriend() {
        return this.friend;
    }

    public void setFriend(String friend) {
        this.friend = friend;
    }


}
