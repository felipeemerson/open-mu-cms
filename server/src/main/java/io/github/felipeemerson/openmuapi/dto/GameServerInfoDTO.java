package io.github.felipeemerson.openmuapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameServerInfoDTO {
    private short serverId;
    private int networkPort;
    private String description;
    private float experienceRate;
    private UUID gameConfigurationId;
}