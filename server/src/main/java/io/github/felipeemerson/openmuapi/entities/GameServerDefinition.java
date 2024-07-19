package io.github.felipeemerson.openmuapi.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Immutable;

import java.util.UUID;

@Entity
@Table(name = "`GameServerDefinition`", schema = "config")
@Immutable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameServerDefinition {
    @Id
    @Column(name = "Id")
    private UUID id;

    @Column(name = "ServerConfigurationId")
    private UUID serverConfigurationId;

    @Column(name = "GameConfigurationId")
    private UUID gameConfigurationId;

    @Column(name = "ServerID")
    private short serverId;

    @Column(name = "Description")
    private String description;

    @Column(name = "ExperienceRate")
    private float experienceRate;
}

