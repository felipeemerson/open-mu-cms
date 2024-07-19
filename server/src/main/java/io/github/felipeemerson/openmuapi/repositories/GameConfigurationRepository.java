package io.github.felipeemerson.openmuapi.repositories;

import io.github.felipeemerson.openmuapi.dto.ServerStatisticsDTO;
import io.github.felipeemerson.openmuapi.entities.GameConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GameConfigurationRepository extends JpaRepository<GameConfiguration, UUID> {

    GameConfiguration findFirstBy();

    @Query("""
        SELECT new io.github.felipeemerson.openmuapi.dto.ServerStatisticsDTO(
            CAST((SELECT COUNT(*) FROM Account) AS int),
            CAST((SELECT COUNT(*) FROM Character) AS int),
            CAST((SELECT COUNT(*) FROM Guild) AS int),
            0
        )
    """)
    ServerStatisticsDTO getStatistics();

}
