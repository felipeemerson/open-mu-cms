package io.github.felipeemerson.openmuapi.controllers;

import io.github.felipeemerson.openmuapi.entities.Guild;
import io.github.felipeemerson.openmuapi.exceptions.BadRequestException;
import io.github.felipeemerson.openmuapi.exceptions.NotFoundException;
import io.github.felipeemerson.openmuapi.services.GuildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GuildController {

    private final GuildService guildService;

    public GuildController(@Autowired GuildService guildService) {
        this.guildService = guildService;
    }

    @GetMapping("/guilds/rank")
    public ResponseEntity<?> getRank(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "10") int size) throws BadRequestException {
        return new ResponseEntity<>(this.guildService.getGuildsRanking(page, size), HttpStatus.OK);
    }

    @GetMapping("/guilds/{guildName}")
    public ResponseEntity<?> getGuildByName(@PathVariable(name = "guildName") String guildName) throws BadRequestException, NotFoundException {
        return new ResponseEntity<>(this.guildService.getGuildByName(guildName), HttpStatus.OK);
    }

}
