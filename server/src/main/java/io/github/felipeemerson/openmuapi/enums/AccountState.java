package io.github.felipeemerson.openmuapi.enums;

import lombok.Getter;

@Getter
public enum AccountState {
    NORMAL(0),
    SPECTATOR(1),
    GAME_MASTER(2),
    GAME_MASTER_INVISIBLE(3),
    BANNED(4),
    TEMPORARILY_BANNED(5);

    private int value;

    AccountState(int value) { this.value = value; }
}
