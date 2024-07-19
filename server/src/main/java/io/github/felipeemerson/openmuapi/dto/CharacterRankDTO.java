package io.github.felipeemerson.openmuapi.dto;

import io.github.felipeemerson.openmuapi.enums.CharacterStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CharacterRankDTO {
    private UUID characterId;
    private String characterName;
    private String characterClassName;
    private Integer resets;
    private Integer level;
    private Integer masterLevel;
    private CharacterStatus status;
    private boolean online;

    public CharacterRankDTO(UUID characterId, String characterName, String characterClassName, Integer resets,
                            Integer level, Integer masterLevel, Integer status, boolean online) {
        this.characterId = characterId;
        this.characterName = characterName;
        this.characterClassName = characterClassName;
        this.resets = resets;
        this.level = level;
        this.masterLevel = masterLevel;
        this.status = CharacterStatus.fromValue(status);
        this.online = online;
    }
}
