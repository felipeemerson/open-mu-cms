package io.github.felipeemerson.openmuapi.repositories;

import io.github.felipeemerson.openmuapi.entities.GameServerEndpoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GameServerEndpointRepository extends JpaRepository<GameServerEndpoint, UUID> {

    GameServerEndpoint findByGameServerDefinitionId(UUID serverDefinitionId);

}
