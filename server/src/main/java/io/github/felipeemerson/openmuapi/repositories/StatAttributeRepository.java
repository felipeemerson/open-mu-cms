package io.github.felipeemerson.openmuapi.repositories;

import io.github.felipeemerson.openmuapi.entities.StatAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface StatAttributeRepository extends JpaRepository<StatAttribute, UUID> {

    @Query("SELECT s " +
            "FROM StatAttribute AS s " +
            "WHERE s.character.id = :characterId " +
            "AND s.attributeDefinition.id IN :definitionsIds")
    List<StatAttribute> findCharacterAttributesByDefinitionId(@Param("characterId") UUID characterId,@Param("definitionsIds") List<UUID> definitionsIds);

}
