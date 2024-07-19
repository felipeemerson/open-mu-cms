package io.github.felipeemerson.openmuapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.github.felipeemerson.openmuapi.entities.Guild;
import io.github.felipeemerson.openmuapi.enums.CharacterStatus;
import io.github.felipeemerson.openmuapi.enums.HeroState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CharacterDTO {
    private UUID characterId;
    private String characterName;
    private String characterClassName;
    private Integer resets;
    private Integer masterLevel;
    private Integer level;
    private int levelUpPoints;
    private int masterLevelUpPoints;
    private MapPositionDTO currentMap;
    private int playerKillCount;
    private HeroState state;
    private CharacterStatus status;
    private CharacterAttributesDTO attributes;

    @JsonIgnoreProperties("members")
    private Guild guild;
}
