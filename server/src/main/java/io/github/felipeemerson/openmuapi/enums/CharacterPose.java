package io.github.felipeemerson.openmuapi.enums;

import lombok.Getter;

@Getter
public enum CharacterPose {
    STANDING(0),
    SITTING(2),
    LEANING(3),
    HANGING(4);

    private int value;

    CharacterPose(int value) { this.value = value; }

    public static CharacterPose fromValue(int value) {
        for (CharacterPose status : CharacterPose.values()) {
            if (status.value == value) {
                return status;
            }
        }

        return null;
    }

}
