package io.github.felipeemerson.openmuapi.controllers;

import io.github.felipeemerson.openmuapi.dto.NewsDTO;
import io.github.felipeemerson.openmuapi.entities.News;
import io.github.felipeemerson.openmuapi.exceptions.BadRequestException;
import io.github.felipeemerson.openmuapi.exceptions.ForbiddenException;
import io.github.felipeemerson.openmuapi.exceptions.NotFoundException;
import io.github.felipeemerson.openmuapi.services.NewsService;
import io.github.felipeemerson.openmuapi.util.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class NewsController {

    private final NewsService newsService;

    public NewsController(@Autowired NewsService newsService) {
        this.newsService = newsService;
    }

    @PostMapping("/news")
    public ResponseEntity<News> createNews(@AuthenticationPrincipal Jwt principal,
                                           @Valid @RequestBody NewsDTO news)
            throws NotFoundException, ForbiddenException, BadRequestException {
        String loginName = JwtUtils.getLoginNameFromToken(principal);

        return  new ResponseEntity<>(this.newsService.createNews(news, loginName), HttpStatus.OK);
    }

    @GetMapping("/news")
    public ResponseEntity<?> getNews(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "10") int size,
                                     @RequestParam(defaultValue = "DESC") Sort.Direction sortDirection) throws BadRequestException {
        return new ResponseEntity<>(this.newsService.getNews(page, size, sortDirection), HttpStatus.OK);
    }

    @GetMapping("/news/{newsId}")
    public ResponseEntity<News> getNewsById(@PathVariable(name = "newsId") UUID newsId) throws NotFoundException {
        return new ResponseEntity<>(this.newsService.getNewsById(newsId), HttpStatus.OK);
    }

    @PatchMapping("/news/{newsId}")
    public ResponseEntity<News> updateNews(@AuthenticationPrincipal Jwt principal,
                                           @PathVariable(name = "newsId") UUID newsId,
                                           @Valid @RequestBody NewsDTO news)
            throws NotFoundException, ForbiddenException, BadRequestException {
        String loginName = JwtUtils.getLoginNameFromToken(principal);
        news.setId(newsId);

        return  new ResponseEntity<>(this.newsService.updateNews(news, loginName), HttpStatus.OK);
    }

    @DeleteMapping("/news/{newsId}")
    public ResponseEntity<?> deleteNews(@AuthenticationPrincipal Jwt principal,
                                        @PathVariable(name = "newsId") UUID newsId) throws NotFoundException, ForbiddenException {
        String loginName = JwtUtils.getLoginNameFromToken(principal);
        this.newsService.deleteNews(newsId, loginName);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
