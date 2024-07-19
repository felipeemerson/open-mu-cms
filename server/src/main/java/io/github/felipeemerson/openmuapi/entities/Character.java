package io.github.felipeemerson.openmuapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.github.felipeemerson.openmuapi.enums.CharacterPose;
import io.github.felipeemerson.openmuapi.enums.CharacterStatus;
import io.github.felipeemerson.openmuapi.enums.HeroState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "`Character`", schema = "data")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Character {
    @Id
    @Column(name = "Id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CharacterClassId")
    @JsonIgnoreProperties({"gameConfiguration", "homeMap", "nextGenerationClass", "characters"})
    private CharacterClass characterClass;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CurrentMapId")
    @JsonIgnoreProperties({"gameConfiguration", "charactersInMap"})
    private GameMapDefinition currentMap;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "InventoryId")
    @JsonIgnoreProperties("characters")
    private ItemStorage inventory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AccountId")
    @JsonIgnoreProperties("characters")
    private Account account;

    @OneToMany(mappedBy = "character", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("character")
    private List<StatAttribute> statAttributes;

    @Column(name = "Name")
    private String name;

    @Column(name = "CharacterSlot")
    private short characterSlot;

    @Column(name = "CreateDate")
    private Timestamp createDate;

    @Column(name = "Experience")
    private long experience;

    @Column(name = "MasterExperience")
    private long masterExperience;

    @Column(name = "LevelUpPoints")
    private int levelUpPoints;

    @Column(name = "MasterLevelUpPoints")
    private int masterLevelUpPoints;

    @Column(name = "PositionX")
    private short positionX;

    @Column(name = "PositionY")
    private short positionY;

    @Column(name = "PlayerKillCount")
    private int playerKillCount;

    @Column(name = "StateRemainingSeconds")
    private int stateRemainingSeconds;

    @Column(name = "State")
    @Enumerated(EnumType.ORDINAL)
    private HeroState state;

    @Column(name = "CharacterStatus")
    private int characterStatus;

    @Column(name = "Pose")
    private int pose;

    @Column(name = "UsedFruitPoints")
    private int usedFruitPoints;

    @Column(name = "UsedNegFruitPoints")
    private int usedNegFruitPoints;

    @Column(name = "InventoryExtensions")
    private int inventoryExtensions;

    @Column(name = "KeyConfiguration")
    private byte[] keyConfiguration;

    @Column(name = "MuHelperConfiguration")
    private byte[] muHelperConfiguration;

    @OneToMany(mappedBy = "author")
    @JsonIgnoreProperties("author")
    private List<News> newsList;

    @Transient
    private Guild guild;

    public CharacterStatus getCharacterStatus() {
        return CharacterStatus.fromValue(characterStatus);
    }

    public CharacterPose getPose() {
        return CharacterPose.fromValue(pose);
    }

}
