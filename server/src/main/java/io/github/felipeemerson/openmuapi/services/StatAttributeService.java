package io.github.felipeemerson.openmuapi.services;

import io.github.felipeemerson.openmuapi.entities.StatAttribute;
import io.github.felipeemerson.openmuapi.repositories.StatAttributeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class StatAttributeService {

    private final StatAttributeRepository statAttributeRepository;

    public StatAttributeService(@Autowired StatAttributeRepository statAttributeRepository) {
        this.statAttributeRepository = statAttributeRepository;
    }

    public List<StatAttribute> getAttributesByDefinitionId(UUID characterId, List<UUID> definitionsIds) {
        return statAttributeRepository.findCharacterAttributesByDefinitionId(characterId, definitionsIds);
    }

    public Map<UUID, StatAttribute> getMapAttributeDefinitionIdToCharacterStats(UUID characterId, List<UUID> definitionsIds) {
        return this.getAttributesByDefinitionId(characterId, definitionsIds).stream()
                .collect(Collectors.toMap(StatAttribute -> StatAttribute.getAttributeDefinition().getId(), Function.identity()));
    }

}
