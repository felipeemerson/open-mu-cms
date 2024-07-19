package io.github.felipeemerson.openmuapi.enums;

import lombok.Getter;

@Getter
public enum HeroState {
    NEW(0),
    HERO(1),
    LIGHT_HERO(2),
    NORMAL(3),
    PLAYER_KILL_WARNING(4),
    PLAYER_KILL_STAGE_1(5),
    PLAYER_KILL_STAGE_2(6);

    private int value;

    HeroState(int value) { this.value = value; }
}
