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
@Table(name = "`GameServerEndpoint`", schema = "config")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameServerEndpoint {
    @Id
    @Column(name = "Id")
    private UUID id;

    @Column(name = "ClientId")
    private UUID clientId;

    @Column(name = "GameServerDefinitionId")
    private UUID gameServerDefinitionId;

    @Column(name = "NetworkPort")
    private int networkPort;

    @Column(name = "AlternativePublishedPort")
    private int alternativePublishedPort;
}