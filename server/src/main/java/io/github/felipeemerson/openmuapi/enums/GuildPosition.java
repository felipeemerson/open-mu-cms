package io.github.felipeemerson.openmuapi.enums;

import lombok.Getter;

@Getter
public enum GuildPosition {
    UNDEFINE(0),
    NORMAL(1),
    GUILD_MASTER(2),
    BATTLE_MASTER(3);

    private int value;

    GuildPosition(int value) { this.value = value; }

}