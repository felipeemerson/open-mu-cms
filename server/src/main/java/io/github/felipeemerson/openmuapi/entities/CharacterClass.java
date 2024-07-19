package io.github.felipeemerson.openmuapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "`CharacterClass`", schema = "config")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CharacterClass {
    @Id
    @Column(name = "Id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NextGenerationClassId")
    private CharacterClass nextGenerationClass;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HomeMapId")
    private GameMapDefinition homeMap;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GameConfigurationId")
    private GameConfiguration gameConfiguration;

    @Column(name = "Number")
    private short number;

    @Column(name = "Name")
    private String name;

    @Column(name = "CanGetCreated")
    private boolean canGetCreated;

    @Column(name = "LevelRequirementByCreation")
    private short levelRequirementByCreation;

    @Column(name = "CreationAllowedFlag")
    private short creationAllowedFlag;

    @Column(name = "IsMasterClass")
    private boolean isMasterClass;

    @Column(name = "LevelWarpRequirementReductionPercent")
    private int levelWarpRequirementReductionPercent;

    @Column(name = "FruitCalculation")
    private int fruitCalculation;

    @Column(name = "ComboDefinitionId")
    private UUID ComboDefinitionId;

    @OneToMany(mappedBy = "characterClass", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("characterClass")
    private List<Character> characters;

    @OneToMany(mappedBy = "characterClass", cascade =  CascadeType.ALL)
    private List<StatAttributeDefinition> statAttributeDefinitions;

}

