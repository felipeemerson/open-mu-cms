package io.github.felipeemerson.openmuapi.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CharacterAttributesDTO {

    @NotNull
    @Min(0)
    private int strength;

    @NotNull
    @Min(0)
    private int agility;

    @NotNull
    @Min(0)
    private int vitality;

    @NotNull
    @Min(0)
    private int energy;

    @NotNull
    @Min(0)
    private int command;
}
