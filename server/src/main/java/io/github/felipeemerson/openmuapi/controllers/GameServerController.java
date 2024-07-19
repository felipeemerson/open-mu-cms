package io.github.felipeemerson.openmuapi.controllers;

import io.github.felipeemerson.openmuapi.dto.CharacterRankDTO;
import io.github.felipeemerson.openmuapi.dto.GameServerInfoDTO;
import io.github.felipeemerson.openmuapi.dto.OnlinePlayersDTO;
import io.github.felipeemerson.openmuapi.dto.ServerStatisticsDTO;
import io.github.felipeemerson.openmuapi.entities.GameConfiguration;
import io.github.felipeemerson.openmuapi.exceptions.BadGatewayException;
import io.github.felipeemerson.openmuapi.exceptions.BadRequestException;
import io.github.felipeemerson.openmuapi.services.GameServerService;
import io.github.felipeemerson.openmuapi.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GameServerController {

    private final GameServerService gameServerService;

    public GameServerController(@Autowired GameServerService gameServerService){
        this.gameServerService = gameServerService;
    }

    @GetMapping("/game/servers")
    public ResponseEntity<List<GameServerInfoDTO>> getGameServerInfo() {
        return new ResponseEntity<>(gameServerService.getGameServerInfo(), HttpStatus.OK);
    }

    @GetMapping("/game/configuration")
    public ResponseEntity<GameConfiguration> getConfiguration() {
        return new ResponseEntity<>(gameServerService.getGameConfiguration(), HttpStatus.OK);
    }

    @GetMapping("/game/status")
    public ResponseEntity<OnlinePlayersDTO> getGameStatus() {
        return new ResponseEntity<>(gameServerService.getOnlinePlayers(), HttpStatus.OK);
    }

    @GetMapping("/game/onlines")
    public ResponseEntity<List<CharacterRankDTO>> getPlayersOnline() {
        return new ResponseEntity<>(gameServerService.getOnlinePlayersDetailed(), HttpStatus.OK);
    }

    @GetMapping("/game/statistics")
    public ResponseEntity<ServerStatisticsDTO> getStatistics() {
        return new ResponseEntity<>(gameServerService.getStatistics(), HttpStatus.OK);
    }

    @GetMapping("/game/send-message/{serverId}")
    public ResponseEntity<?> sendServerMessage(@PathVariable(name = "serverId") int serverId,
                                               @RequestParam(name = "msg") String message,
                                               @AuthenticationPrincipal Jwt principal) throws BadRequestException, BadGatewayException {
        String loginName = JwtUtils.getLoginNameFromToken(principal);

        this.gameServerService.sendServerMessage(message, serverId, loginName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
