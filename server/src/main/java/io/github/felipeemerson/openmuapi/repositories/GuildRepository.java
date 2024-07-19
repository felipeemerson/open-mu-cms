package io.github.felipeemerson.openmuapi.repositories;

import io.github.felipeemerson.openmuapi.dto.GuildRankDTO;
import io.github.felipeemerson.openmuapi.entities.Guild;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface GuildRepository extends JpaRepository<Guild, UUID> {

    Optional<Guild> findByName(String name);

    @Query("""
           SELECT new io.github.felipeemerson.openmuapi.dto.GuildRankDTO(g.id, g.name, g.logo, g.score,
           (
                SELECT c.name
                FROM GuildMember gm
                LEFT JOIN Character c ON gm.id = c.id
                WHERE gm.guild.id = g.id AND gm.status = 2
           ),
           (CAST((SELECT COUNT(gm) FROM GuildMember gm WHERE gm.guild.id = g.id) AS int)))
           FROM Guild g
           ORDER BY g.score DESC
           """)
    Page<GuildRankDTO> findGuildsRanked(Pageable pageable);
}
