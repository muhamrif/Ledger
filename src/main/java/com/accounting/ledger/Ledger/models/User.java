package com.accounting.ledger.Ledger.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import com.accounting.ledger.Ledger.models.authentication.Authority;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class User {

   private int id;
   private String username;
   @JsonIgnore
   private String password;
   @JsonIgnore
   private boolean activated;
   private Set<Authority> authorities = new HashSet<>();

   public User() {
      this.activated = true;
   }

   public void addRole(String role)
   {
      String authority = role.contains("ROLE_") ? role : "ROLE_" + role;
      this.authorities.add(new Authority(authority));
   }

   @Override
   public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      User user = (User) o;
      return id == user.id &&
              activated == user.activated &&
              Objects.equals(username, user.username) &&
              Objects.equals(password, user.password) &&
              Objects.equals(authorities, user.authorities);
   }

   @Override
   public int hashCode() {
      return Objects.hash(id, username, password, activated, authorities);
   }

   @Override
   public String toString() {
      return "User{" +
              "id=" + id +
              ", username='" + username + '\'' +
              ", activated=" + activated +
              ", authorities=" + authorities +
              '}';
   }

   @JsonIgnore
   public String getRole()
   {
      if(authorities.size() > 0)
      {
         for(Authority role: authorities)
         {
            return role.getName().toUpperCase();
         }
      }

      return "ROLE_USER";
   }
}
