package io.github.felipeemerson.openmuapi.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.github.felipeemerson.openmuapi.entities.Character;
import io.github.felipeemerson.openmuapi.entities.ItemStorage;
import io.github.felipeemerson.openmuapi.enums.AccountState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {

    private UUID id;
    private String loginName;
    private String email;
    private Timestamp registrationDate;
    private AccountState state;
    private String vaultPassword;
    private boolean isVaultExtended;
    private Timestamp chatBanUntil;
    private List<CharacterRankDTO> characters;

}
