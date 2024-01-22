package com.accounting.ledger.Ledger.controllers;

import javax.validation.Valid;

import com.accounting.ledger.Ledger.data.ProfileDao;
import com.accounting.ledger.Ledger.data.UserDao;
import com.accounting.ledger.Ledger.models.Profile;
import com.accounting.ledger.Ledger.models.User;
import com.accounting.ledger.Ledger.models.authentication.LoginDto;
import com.accounting.ledger.Ledger.models.authentication.LoginResponseDto;
import com.accounting.ledger.Ledger.models.authentication.RegisterUserDto;
import com.accounting.ledger.Ledger.models.security.jwt.JWTFilter;
import com.accounting.ledger.Ledger.models.security.jwt.TokenProvider;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;



@RestController
@CrossOrigin
@PreAuthorize("permitAll()")
public class AuthenticationController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private UserDao userDao;
    private ProfileDao profileDao;

    public AuthenticationController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, UserDao userDao, ProfileDao profileDao) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userDao = userDao;
        this.profileDao = profileDao;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.createToken(authentication, false);

        try
        {
            User user = userDao.getByUserName(loginDto.getUsername());

            if (user == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
            return new ResponseEntity<>(new LoginResponseDto(jwt, user), httpHeaders, HttpStatus.OK);
        }
        catch(Exception ex)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Oops... our bad.");
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<User> register(@Valid @RequestBody RegisterUserDto newUser) {

        try
        {
            boolean exists = userDao.exists(newUser.getUsername());
            if (exists)
            {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User Already Exists.");
            }

            // create user
            User user = userDao.create(new User(0, newUser.getUsername(), newUser.getPassword(), "ROLE_USER"));

            // create profile
            Profile profile = new Profile();
            profile.setUserId(user.getId());
            profileDao.create(profile);

            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }
        catch (Exception e)
        {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Oops... our bad.");
        }
    }

}

