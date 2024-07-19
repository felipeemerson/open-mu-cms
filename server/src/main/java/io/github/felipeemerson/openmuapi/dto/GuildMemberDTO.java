package io.github.felipeemerson.openmuapi.dto;

import io.github.felipeemerson.openmuapi.entities.GuildMember;
import io.github.felipeemerson.openmuapi.enums.GuildPosition;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GuildMemberDTO {
    private UUID characterId;
    private String characterName;
    private String characterClassName;
    private Integer resets;
    private Integer level;
    private Integer masterLevel;
    private GuildPosition guildPosition;
    private boolean online;

    public static GuildMemberDTO parseFromCharacterRankDto(CharacterRankDTO characterDTO) {
        GuildMemberDTO guildMemberDTO = new GuildMemberDTO();

        guildMemberDTO.setCharacterId(characterDTO.getCharacterId());
        guildMemberDTO.setCharacterName(characterDTO.getCharacterName());
        guildMemberDTO.setLevel(characterDTO.getLevel());
        guildMemberDTO.setResets(characterDTO.getResets());
        guildMemberDTO.setCharacterClassName(characterDTO.getCharacterClassName());
        guildMemberDTO.setOnline(characterDTO.isOnline());

        return guildMemberDTO;
    }
}
