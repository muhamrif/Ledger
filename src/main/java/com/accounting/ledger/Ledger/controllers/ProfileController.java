package com.accounting.ledger.Ledger.controllers;

import com.accounting.ledger.Ledger.data.ProfileDao;
import com.accounting.ledger.Ledger.data.UserDao;
import com.accounting.ledger.Ledger.models.Profile;
import com.accounting.ledger.Ledger.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.security.Principal;

@RestController
@RequestMapping("/profile")
@PreAuthorize("isAuthenticated()")
@CrossOrigin
public class ProfileController {
    private final ProfileDao profileDao;
    private final UserDao userDao;

    @Autowired
    public ProfileController(ProfileDao profileDao, UserDao userDao) {
        this.profileDao = profileDao;
        this.userDao = userDao;
    }

    @GetMapping("")
    @PreAuthorize("isAuthenticated()")
    public Profile getProfile(Principal principal) {
        try {
            String userName = principal.getName();
            User user = userDao.getByUserName(userName);
            int userId = user.getId();
            return profileDao.get(userId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Oops... our bad." );
        }
    }

    @PutMapping("")
    @PreAuthorize("isAuthenticated()")
    public Profile updateProfile(Principal principal, @RequestBody Profile profile) {
        try {
            String userName = principal.getName();
            User user = userDao.getByUserName(userName);
            int userId = user.getId();
            profile.setUserId(userId);
            return profileDao.update(profile);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Oops... our bad." );
        }
    }

}

