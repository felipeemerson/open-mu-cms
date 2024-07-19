package io.github.felipeemerson.openmuapi.enums;

import lombok.Getter;

@Getter
public enum CharacterStatus {
    NORMAL(0),
    BANNED(1),
    GAME_MASTER(32);

    private int value;

    CharacterStatus(int value) { this.value = value; }

    public static CharacterStatus fromValue(int value) {
        for (CharacterStatus status : CharacterStatus.values()) {
            if (status.value == value) {
                return status;
            }
        }

        return null;
    }
}
