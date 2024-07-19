package io.github.felipeemerson.openmuapi.controllers;

import io.github.felipeemerson.openmuapi.entities.Banner;
import io.github.felipeemerson.openmuapi.exceptions.ForbiddenException;
import io.github.felipeemerson.openmuapi.exceptions.NotFoundException;
import io.github.felipeemerson.openmuapi.services.AccountService;
import io.github.felipeemerson.openmuapi.services.BannerService;
import io.github.felipeemerson.openmuapi.util.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BannerController {

    private final BannerService bannerService;
    private final AccountService accountService;

    public BannerController(@Autowired BannerService bannerService,
                            @Autowired AccountService accountService) {
        this.bannerService = bannerService;
        this.accountService = accountService;
    }

    @PostMapping("/banners")
    public ResponseEntity<List<Banner>> changeBanners(@AuthenticationPrincipal Jwt jwt,
                                                      @RequestBody @Valid List<Banner> banners) throws NotFoundException, ForbiddenException {
        String loginName = JwtUtils.getLoginNameFromToken(jwt);

        this.accountService.getAccountAndCheckPrivileges(loginName);

        return new ResponseEntity<>(this.bannerService.changeBanners(banners), HttpStatus.OK);
    }

    @GetMapping("/banners")
    public ResponseEntity<List<Banner>> getBanners() {
        return new ResponseEntity<>(this.bannerService.getBanners(), HttpStatus.OK);
    }

}
