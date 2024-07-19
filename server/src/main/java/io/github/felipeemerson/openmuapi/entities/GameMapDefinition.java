package io.github.felipeemerson.openmuapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "`GameMapDefinition`", schema = "config")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class GameMapDefinition {

    @Id
    @Column(name = "Id")
    private UUID id;

    @Column(name = "SafezoneMapId")
    private UUID safezoneMapId;

    @Column(name = "BattleZoneId")
    private UUID battleZoneId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "GameConfigurationId")
    private GameConfiguration gameConfiguration;

    @Column(name = "Number")
    private short number;

    @Column(name = "Name")
    private String name;

    @Column(name = "TerrainData")
    @JsonIgnore
    private byte[] terrainData;

    @Column(name = "ExpMultiplier")
    private double expMultiplier;

    @Column(name = "Discriminator")
    private int discriminator;

    @OneToMany(mappedBy = "currentMap", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("currentMap")
    private List<Character> charactersInMap;

}

