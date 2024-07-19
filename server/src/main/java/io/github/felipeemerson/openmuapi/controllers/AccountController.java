package io.github.felipeemerson.openmuapi.controllers;

import io.github.felipeemerson.openmuapi.dto.*;
import io.github.felipeemerson.openmuapi.entities.Account;
import io.github.felipeemerson.openmuapi.exceptions.BadRequestException;
import io.github.felipeemerson.openmuapi.exceptions.NotFoundException;
import io.github.felipeemerson.openmuapi.services.AccountService;
import io.github.felipeemerson.openmuapi.services.JwtService;
import io.github.felipeemerson.openmuapi.util.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
public class AccountController {

    private final AccountService accountService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AccountController(@Autowired AccountService accountService,
                             @Autowired JwtService jwtService,
                             @Autowired PasswordEncoder passwordEncoder) {
        this.accountService = accountService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<AccountDTO> registerNewAccount(@RequestBody @Valid AccountRegistrationDTO registrationDTO) throws BadRequestException {
        AccountDTO account = this.accountService.createAccount(registrationDTO);

        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @PostMapping("/login")
    public JwtResponseDTO AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO) throws RuntimeException {
        Account account;

        try {
            account = accountService.getAccountByLoginName(authRequestDTO.getLoginName());

            if (!passwordEncoder.matches(authRequestDTO.getPassword(), account.getPasswordHash())) {
                throw new BadRequestException();
            }
        } catch (NotFoundException | BadRequestException e) {
            throw new BadRequestException("Login or password incorrect.");
        }

        try {
            return JwtResponseDTO
                    .builder()
                    .accessToken(jwtService.generateToken(authRequestDTO.getLoginName(), account.getState()))
                    .build();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/accounts/me")
    public ResponseEntity<AccountDTO> getAccount(@AuthenticationPrincipal Jwt principal) {
        String loginName = JwtUtils.getLoginNameFromToken(principal);
        return new ResponseEntity<>(accountService.getAccountDTOByLoginName(loginName), HttpStatus.OK);
    }

    @PutMapping("/accounts/change-password")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal Jwt principal, @RequestBody @Valid ChangePasswordDTO changePasswordDTO) {
        String loginName = JwtUtils.getLoginNameFromToken(principal);

        this.accountService.changePassword(loginName, changePasswordDTO);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
