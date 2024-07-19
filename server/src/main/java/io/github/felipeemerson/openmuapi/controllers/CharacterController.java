package io.github.felipeemerson.openmuapi.controllers;

import io.github.felipeemerson.openmuapi.dto.CharacterAttributesDTO;
import io.github.felipeemerson.openmuapi.dto.CharacterDTO;
import io.github.felipeemerson.openmuapi.exceptions.BadRequestException;
import io.github.felipeemerson.openmuapi.exceptions.ForbiddenException;
import io.github.felipeemerson.openmuapi.exceptions.NotFoundException;
import io.github.felipeemerson.openmuapi.services.CharacterService;
import io.github.felipeemerson.openmuapi.util.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
public class CharacterController {

    private final CharacterService characterService;

    public CharacterController(@Autowired CharacterService characterService) {
        this.characterService = characterService;
    }

    @GetMapping("/characters/{characterName}")
    public ResponseEntity<CharacterDTO> getCharacterByName(@PathVariable(name = "characterName") String characterName,
                                                        @AuthenticationPrincipal Jwt principal) throws NotFoundException, ForbiddenException {
        String loginName = JwtUtils.getLoginNameFromToken(principal);
        return new ResponseEntity<>(this.characterService.getCharacterByName(loginName, characterName), HttpStatus.OK);
    }

    @GetMapping("/characters/rank")
    public ResponseEntity<?> getRank(@RequestParam(defaultValue = "0") int page,
                                     @RequestParam(defaultValue = "10") int size,
                                     @RequestParam(required = false) String filterClasses) throws BadRequestException {
        return new ResponseEntity<>(this.characterService.getCharactersRanking(page, size, filterClasses), HttpStatus.OK);
    }

    @PatchMapping("/characters/{characterName}/attributes")
    public ResponseEntity<CharacterDTO> updateCharacterAttributes(@PathVariable(name = "characterName") String characterName,
                                                                  @RequestBody @Valid CharacterAttributesDTO characterAttributesDTO,
                                                                  @AuthenticationPrincipal Jwt principal) {
        String loginName = JwtUtils.getLoginNameFromToken(principal);
        return new ResponseEntity<>(
                this.characterService.updateCharacterAttributes(loginName, characterName, characterAttributesDTO),
                HttpStatus.OK
        );
    }

    @PatchMapping("/characters/{characterName}/reset")
    public ResponseEntity<CharacterDTO> resetCharacter(@PathVariable(name = "characterName") String characterName,
                                                       @AuthenticationPrincipal Jwt principal) {
        String loginName = JwtUtils.getLoginNameFromToken(principal);
        return new ResponseEntity<>(
                this.characterService.resetCharacter(loginName, characterName),
                HttpStatus.OK
        );
    }

}
