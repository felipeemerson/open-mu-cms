package io.github.felipeemerson.openmuapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GuildRankDTO {

    private UUID id;
    private String name;
    private byte[] logo;
    private int score;
    private String guildMaster;
    private int members;

}