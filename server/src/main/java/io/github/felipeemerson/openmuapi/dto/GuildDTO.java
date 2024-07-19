package io.github.felipeemerson.openmuapi.dto;

import io.github.felipeemerson.openmuapi.entities.Guild;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GuildDTO {

    private UUID id;
    private Guild hostilityGuild;
    private Guild allianceGuild;
    private String name;
    private byte[] logo;
    private int score;
    private String notice;
    private String guildMaster;
    private List<GuildMemberDTO> members;

}
