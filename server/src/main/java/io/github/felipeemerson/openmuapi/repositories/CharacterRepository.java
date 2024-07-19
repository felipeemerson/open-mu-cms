package io.github.felipeemerson.openmuapi.repositories;

import io.github.felipeemerson.openmuapi.dto.CharacterRankDTO;
import io.github.felipeemerson.openmuapi.entities.Character;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CharacterRepository extends JpaRepository<Character, UUID> {

    Optional<Character> findCharacterByName(String characterName);

    @Query("""
        SELECT new io.github.felipeemerson.openmuapi.dto.CharacterRankDTO(c.id, c.name, cc.name,
        CAST(COALESCE(r.value, 0) AS int) AS resets, CAST(COALESCE(l.value, 0) AS int) AS level_value,
        CAST(COALESCE(m.value, 0) AS int) AS master_level, c.characterStatus, FALSE)
        FROM Character c
        LEFT JOIN c.characterClass cc
        LEFT JOIN c.statAttributes r ON r.attributeDefinition.id = :resetAttributeId
        LEFT JOIN c.statAttributes m ON m.attributeDefinition.id = :masterLevelAttributeId
        LEFT JOIN c.statAttributes l ON l.attributeDefinition.id = :levelAttributeId
        WHERE :filterClasses IS NULL OR c.characterClass.name IN :filterClasses
        ORDER BY resets DESC, level_value DESC
    """)
    Page<CharacterRankDTO> findCharactersRanked(@Param("resetAttributeId") UUID resetAttributeId,
                                                @Param("masterLevelAttributeId") UUID masterLevelAttributeId,
                                                @Param("levelAttributeId") UUID levelAttributeId,
                                                @Param("filterClasses") List<String> filterClasses,
                                                Pageable pageable);

    @Query("""
        SELECT new io.github.felipeemerson.openmuapi.dto.CharacterRankDTO(c.id, c.name, cc.name,
        CAST(COALESCE(r.value, 0) AS int) AS resets, CAST(COALESCE(l.value, 0) AS int) AS level_value,
        CAST(COALESCE(m.value, 0) AS int) AS master_level, c.characterStatus, FALSE)
        FROM Character c
        LEFT JOIN c.characterClass cc
        LEFT JOIN c.statAttributes r ON r.attributeDefinition.id = :resetAttributeId
        LEFT JOIN c.statAttributes m ON m.attributeDefinition.id = :masterLevelAttributeId
        LEFT JOIN c.statAttributes l ON l.attributeDefinition.id = :levelAttributeId
        WHERE c.id IN :charactersIds
    """)
    List<CharacterRankDTO> findCharactersByIds(
            @Param("resetAttributeId") UUID resetAttributeId,
            @Param("masterLevelAttributeId") UUID masterLevelAttributeId,
            @Param("levelAttributeId") UUID levelAttributeId,
            @Param("charactersIds") List<UUID> charactersIds
    );

    @Query("""
        SELECT new io.github.felipeemerson.openmuapi.dto.CharacterRankDTO(c.id, c.name, cc.name,
        CAST(COALESCE(r.value, 0) AS int) AS resets, CAST(COALESCE(l.value, 0) AS int) AS level_value,
        CAST(COALESCE(m.value, 0) AS int) AS master_level, c.characterStatus, FALSE)
        FROM Character c
        LEFT JOIN c.characterClass cc
        LEFT JOIN c.statAttributes r ON r.attributeDefinition.id = :resetAttributeId
        LEFT JOIN c.statAttributes m ON m.attributeDefinition.id = :masterLevelAttributeId
        LEFT JOIN c.statAttributes l ON l.attributeDefinition.id = :levelAttributeId
        WHERE c.name IN :charactersNameList
    """)
    List<CharacterRankDTO> findCharactersByNameIn(
            @Param("resetAttributeId") UUID resetAttributeId,
            @Param("masterLevelAttributeId") UUID masterLevelAttributeId,
            @Param("levelAttributeId") UUID levelAttributeId,
            @Param("charactersNameList") List<String> charactersNameList
    );

}
