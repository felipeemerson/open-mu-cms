package io.github.felipeemerson.openmuapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OnlinePlayersDTO {
    private String state;
    private int players;
    private String[] playersList;
}
