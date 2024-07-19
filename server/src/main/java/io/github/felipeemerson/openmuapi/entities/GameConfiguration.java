package io.github.felipeemerson.openmuapi.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "`GameConfiguration`", schema = "config")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameConfiguration {
    @Id
    @Column(name = "Id")
    private UUID id;

    @Column(name = "MaximumLevel")
    private short maximumLevel;

    @Column(name = "MaximumMasterLevel")
    private short maximumMasterLevel;

    @Column(name = "ExperienceRate")
    private float experienceRate;

    @Column(name = "MinimumMonsterLevelForMasterExperience")
    private short minimumMonsterLevelForMasterExperience;

    @Column(name = "InfoRange")
    private short infoRange;

    @Column(name = "AreaSkillHitsPlayer")
    private boolean areaSkillHitsPlayer;

    @Column(name = "MaximumInventoryMoney")
    private int maximumInventoryMoney;

    @Column(name = "MaximumVaultMoney")
    private int maximumVaultMoney;

    @Column(name = "RecoveryInterval")
    private int recoveryInterval;

    @Column(name = "MaximumLetters")
    private int maximumLetters;

    @Column(name = "LetterSendPrice")
    private int letterSendPrice;

    @Column(name = "MaximumCharactersPerAccount")
    private short maximumCharactersPerAccount;

    @Column(name = "CharacterNameRegex")
    private String characterNameRegex;

    @Column(name = "MaximumPasswordLength")
    private int maximumPasswordLength;

    @Column(name = "MaximumPartySize")
    private short maximumPartySize;

    @Column(name = "ShouldDropMoney")
    private boolean shouldDropMoney;

    @Column(name = "DamagePerOneItemDurability")
    private double damagePerOneItemDurability;

    @Column(name = "DamagePerOnePetDurability")
    private double damagePerOnePetDurability;

    @Column(name = "HitsPerOneItemDurability")
    private double hitsPerOneItemDurability;

    @Column(name = "ItemDropDuration")
    private String itemDropDuration;
}
