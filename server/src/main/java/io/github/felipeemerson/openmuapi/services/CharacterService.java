package io.github.felipeemerson.openmuapi.services;

import io.github.felipeemerson.openmuapi.configuration.SystemConstants;
import io.github.felipeemerson.openmuapi.dto.CharacterAttributesDTO;
import io.github.felipeemerson.openmuapi.dto.CharacterDTO;
import io.github.felipeemerson.openmuapi.dto.CharacterRankDTO;
import io.github.felipeemerson.openmuapi.dto.MapPositionDTO;
import io.github.felipeemerson.openmuapi.entities.*;
import io.github.felipeemerson.openmuapi.entities.Character;
import io.github.felipeemerson.openmuapi.exceptions.BadRequestException;
import io.github.felipeemerson.openmuapi.exceptions.ForbiddenException;
import io.github.felipeemerson.openmuapi.exceptions.NotFoundException;
import io.github.felipeemerson.openmuapi.repositories.CharacterRepository;
import io.github.felipeemerson.openmuapi.repositories.GuildMemberRepository;
import io.github.felipeemerson.openmuapi.repositories.ItemStorageRepository;
import io.github.felipeemerson.openmuapi.repositories.StatAttributeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.SerializationUtils;

import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.lang.Thread.sleep;

@Service
public class CharacterService {

    private final CharacterRepository characterRepository;
    private final GuildMemberRepository guildMemberRepository;
    private final StatAttributeService statAttributeService;
    private final StatAttributeRepository statAttributeRepository;
    private final ItemStorageRepository itemStorageRepository;
    private final GameServerService gameServerService;



    public CharacterService(@Autowired CharacterRepository characterRepository,
                            @Autowired GuildMemberRepository guildMemberRepository,
                            @Autowired StatAttributeService statAttributeService,
                            @Autowired StatAttributeRepository statAttributeRepository,
                            @Autowired ItemStorageRepository itemStorageRepository,
                            @Lazy GameServerService gameServerService) {
        this.characterRepository = characterRepository;
        this.guildMemberRepository = guildMemberRepository;
        this.statAttributeService = statAttributeService;
        this.statAttributeRepository = statAttributeRepository;
        this.itemStorageRepository = itemStorageRepository;
        this.gameServerService = gameServerService;
    }

    public CharacterDTO getCharacterByName(String loginName, String characterName) throws NotFoundException, ForbiddenException {
        Character character = this.getCharacterAndCheckPrivileges(loginName, characterName);

        Optional<GuildMember> guild = guildMemberRepository.findById(character.getId());

        if (guild.isEmpty()) {
            character.setGuild(null);
        } else {
            character.setGuild(guild.get().getGuild());
        }

        CharacterDTO characterDTO = new CharacterDTO();
        mapCharacterToCharacterDTO(character, characterDTO);

        setCharacterAttributes(characterDTO);

        return characterDTO;
    }

    public List<CharacterRankDTO> getCharactersByIds(List<UUID> ids) {
        return this.characterRepository.findCharactersByIds(
                SystemConstants.RESETS_DEFINITION_ID,
                SystemConstants.MASTER_LEVEL_DEFINITION_ID,
                SystemConstants.LEVEL_DEFINITION_ID,
                ids
        );
    }

    public List<CharacterRankDTO> getPlayersByName(List<String> charactersNameList) {
        return this.characterRepository.findCharactersByNameIn(
                SystemConstants.RESETS_DEFINITION_ID,
                SystemConstants.MASTER_LEVEL_DEFINITION_ID,
                SystemConstants.LEVEL_DEFINITION_ID,
                charactersNameList
        );
    }

    public Page<CharacterRankDTO> getCharactersRanking(int page, int size, String filterClasses) throws BadRequestException {
        validatePaginatedAttributes(page, size);

        List<String> filterClassesList = null;

        if (filterClasses != null && !filterClasses.isBlank()) {
            filterClassesList = Arrays.asList(filterClasses.split(","));

            for (String characterClass : filterClassesList) {
                if(!SystemConstants.ALL_CLASSES.contains(characterClass)) {
                    throw new BadRequestException("Character class " + characterClass + " is invalid.");
                }
            }
        }

        Pageable pageable = PageRequest.of(page, size);

        String[] onlines = gameServerService.getOnlinePlayers().getPlayersList();

        Page<CharacterRankDTO> pageResult = characterRepository.findCharactersRanked(
                SystemConstants.RESETS_DEFINITION_ID,
                SystemConstants.MASTER_LEVEL_DEFINITION_ID,
                SystemConstants.LEVEL_DEFINITION_ID,
                filterClassesList,
                pageable
        );

        pageResult.map(character -> {
            character.setOnline(Arrays.stream(onlines).anyMatch(name -> name.equals(character.getCharacterName())));
            return character;
        });

        return pageResult;
    }

    @Transactional
    public CharacterDTO updateCharacterAttributes(String loginName,
                                                  String characterName,
                                                  CharacterAttributesDTO characterAttributesDTO)
                                throws NotFoundException, ForbiddenException, BadRequestException {
        Character character = this.getCharacterAndCheckPrivileges(loginName, characterName);

        checkIfCharacterIsOnline(character.getAccount().getLoginName());

        boolean isDLOrLE = SystemConstants.DL_CLASSES.contains(character.getCharacterClass().getName());

        if (characterAttributesDTO.getCommand() > 0 && !isDLOrLE) {
            throw new BadRequestException("You can't add points in command for this character");
        }

        int pointsAvailable = character.getLevelUpPoints();

        int sumAllAttributes = characterAttributesDTO.getStrength() + characterAttributesDTO.getAgility() +
                                characterAttributesDTO.getVitality() + characterAttributesDTO.getEnergy() +
                                characterAttributesDTO.getCommand();

        if (sumAllAttributes > pointsAvailable) {
            throw new BadRequestException(String.format("Not enough points available: %s", pointsAvailable));
        }

        Map<UUID, StatAttribute> characterStats =
                this.statAttributeService.getMapAttributeDefinitionIdToCharacterStats(character.getId(),
                        getCharacterAttributeIdList());

        List<UUID> statsIds = List.of(SystemConstants.STRENGTH_DEFINITION_ID,
                                        SystemConstants.AGILITY_DEFINITION_ID,
                                        SystemConstants.VITALITY_DEFINITION_ID,
                                        SystemConstants.ENERGY_DEFINITION_ID,
                                        SystemConstants.COMMAND_DEFINITION_ID);
        List<Integer> pointsToAddList = List.of(characterAttributesDTO.getStrength(),
                                                characterAttributesDTO.getAgility(),
                                                characterAttributesDTO.getVitality(),
                                                characterAttributesDTO.getEnergy(),
                                                characterAttributesDTO.getCommand());

        for (int i = 0; i < statsIds.size(); i++) {
            StatAttribute currentAttribute = characterStats.get(statsIds.get(i));

            float pointsToAdd;

            if (currentAttribute != null) { // when add to command in a non DL character
                pointsToAdd = calculatePointsToAdd(pointsToAddList.get(i), currentAttribute.getValue());
                pointsAvailable -= (int) pointsToAdd;
                currentAttribute.setValue(currentAttribute.getValue() + pointsToAdd);
            }
        }

        List<StatAttribute> characterStatsWithAddedPoints = new ArrayList<>(characterStats.values());
        this.statAttributeRepository.saveAll(characterStatsWithAddedPoints);

        character.setLevelUpPoints(pointsAvailable);

        character = this.characterRepository.save(character);

        CharacterDTO characterDTO = new CharacterDTO();
        mapCharacterToCharacterDTO(character, characterDTO);

        setCharacterAttributes(characterDTO, characterStats);

        return characterDTO;
    }

    private void checkIfCharacterIsOnline(String loginName) throws BadRequestException {
        boolean isOnline = this.gameServerService.isAccountOnline(loginName);

        if (isOnline) {
            throw new BadRequestException("Disconnect from the game before do this");
        }
    }

    @Transactional
    public CharacterDTO resetCharacter(String loginName,
                                        String characterName)
                    throws NotFoundException, ForbiddenException, BadRequestException {
        Character character = this.getCharacterAndCheckPrivileges(loginName, characterName);

        checkIfCharacterIsOnline(character.getAccount().getLoginName());

        Map<UUID, StatAttribute> characterStats =
                this.statAttributeService.getMapAttributeDefinitionIdToCharacterStats(character.getId(),
                        getCharacterAttributeIdList());

        float level = characterStats.get(SystemConstants.LEVEL_DEFINITION_ID).getValue();
        float resets = characterStats.get(SystemConstants.RESETS_DEFINITION_ID).getValue();

        if (level < SystemConstants.RESET_REQUIRED_LEVEL) {
            throw new BadRequestException(String.format("Required level is %s", 400));
        }

        int resetsPlusOne = (int) (resets + 1);
        boolean hasResetLimit = SystemConstants.RESET_LIMIT > 0;

        if (hasResetLimit && resetsPlusOne > SystemConstants.RESET_LIMIT) {
            throw new BadRequestException(String.format("Maximum resets of %s reached", SystemConstants.RESET_LIMIT));
        }

        int requiredZen = SystemConstants.RESET_REQUIRED_ZEN;

        ItemStorage itemStorage = this.itemStorageRepository.findById(character.getInventory().getId()).get();

        if (SystemConstants.RESET_MULTIPLY_REQUIRED_ZEN) {
            requiredZen *= resetsPlusOne;
        }

        if (itemStorage.getMoney() < requiredZen) {
            throw new BadRequestException(String.format("You don't have enough money for reset, required zen is %s", requiredZen));
        }

        itemStorage.setMoney(itemStorage.getMoney() - requiredZen);

        characterStats.get(SystemConstants.RESETS_DEFINITION_ID).setValue(resetsPlusOne);
        characterStats.get(SystemConstants.LEVEL_DEFINITION_ID).setValue(SystemConstants.LEVEL_AFTER_RESET);
        character.setExperience(0);

        List<StatAttributeDefinition> characterClassBaseAttributes = character.getCharacterClass().getStatAttributeDefinitions();
        Map<UUID, StatAttributeDefinition> mapBaseAttributes = characterClassBaseAttributes.stream()
                .collect(Collectors.toMap(StatAttributeDefinition -> StatAttributeDefinition.getAttribute().getId(), Function.identity()));

        boolean isDLOrLE = SystemConstants.DL_CLASSES.contains(character.getCharacterClass().getName());

        float baseStrength = mapBaseAttributes.get(SystemConstants.STRENGTH_DEFINITION_ID).getBaseValue();
        float baseAgility = mapBaseAttributes.get(SystemConstants.AGILITY_DEFINITION_ID).getBaseValue();
        float baseVitality = mapBaseAttributes.get(SystemConstants.VITALITY_DEFINITION_ID).getBaseValue();
        float baseEnergy = mapBaseAttributes.get(SystemConstants.ENERGY_DEFINITION_ID).getBaseValue();
        float baseCommand = 0;

        if (isDLOrLE) {
            baseCommand = mapBaseAttributes.get(SystemConstants.COMMAND_DEFINITION_ID).getBaseValue();
        }

        character.setLevelUpPoints(resetsPlusOne * SystemConstants.POINTS_PER_RESET);
        characterStats.get(SystemConstants.STRENGTH_DEFINITION_ID).setValue(baseStrength);
        characterStats.get(SystemConstants.AGILITY_DEFINITION_ID).setValue(baseAgility);
        characterStats.get(SystemConstants.VITALITY_DEFINITION_ID).setValue(baseVitality);
        characterStats.get(SystemConstants.ENERGY_DEFINITION_ID).setValue(baseEnergy);

        if (isDLOrLE){
            characterStats.get(SystemConstants.COMMAND_DEFINITION_ID).setValue(baseCommand);
        }

        character.setCurrentMap(character.getCharacterClass().getHomeMap());

        if (SystemConstants.ELF_CLASSES.contains(character.getCharacterClass().getName())) {
            character.setPositionX((short) 176);
            character.setPositionY((short) 116);
        } else if (SystemConstants.SUM_CLASSES.contains(character.getCharacterClass().getName())) {
            character.setPositionX((short) 51);
            character.setPositionY((short) 226);
        } else {
            character.setPositionX((short) 141);
            character.setPositionY((short) 121);
        }

        List<StatAttribute> statAttributes = new ArrayList<>(characterStats.values());

        itemStorageRepository.save(itemStorage);
        statAttributeRepository.saveAll(statAttributes);
        characterRepository.save(character);

        CharacterDTO characterDTO = new CharacterDTO();
        mapCharacterToCharacterDTO(character, characterDTO);
        setCharacterAttributes(characterDTO, characterStats);

        return characterDTO;
    }

    private float calculatePointsToAdd(int pointsRequested, float attributePoints) {
        float addedPoints = pointsRequested + attributePoints;

        if (addedPoints > SystemConstants.MAX_STATS_POINTS) {
            return 0;
        }

        return pointsRequested;
    }

    private Character getCharacterAndCheckPrivileges(String loginName, String characterName) throws NotFoundException, ForbiddenException {
        Optional<Character> characterOptional = this.characterRepository.findCharacterByName(characterName);

        if (characterOptional.isEmpty()) {
            throw new NotFoundException(String.format("Character %s was not found.", characterName));
        }

        Character character = characterOptional.get();

        if (!character.getAccount().getLoginName().equals(loginName)) {
            throw new ForbiddenException("You don't have permission to access this character's data.");
        }

        return character;
    }

    private static void validatePaginatedAttributes(int page, int size) throws BadRequestException {
        if (page < 0 || size < 1) {
            throw new BadRequestException("Page should be higher than -1 and size should be higher than 0.");
        }
    }

    private static void mapCharacterToCharacterDTO(Character character, CharacterDTO characterDTO) {
        characterDTO.setCharacterId(character.getId());
        characterDTO.setCharacterName(character.getName());
        characterDTO.setGuild(character.getGuild());
        characterDTO.setCharacterClassName(character.getCharacterClass().getName());
        characterDTO.setState(character.getState());
        characterDTO.setStatus(character.getCharacterStatus());
        characterDTO.setPlayerKillCount(character.getPlayerKillCount());
        characterDTO.setLevelUpPoints(character.getLevelUpPoints());
        characterDTO.setMasterLevelUpPoints(character.getMasterLevelUpPoints());
        characterDTO.setCurrentMap(new MapPositionDTO(
                character.getCurrentMap().getName(),
                character.getPositionX(),
                character.getPositionY()
        ));
    }

    private static List<UUID> getCharacterAttributeIdList() {
        return List.of(
                SystemConstants.RESETS_DEFINITION_ID,
                SystemConstants.MASTER_LEVEL_DEFINITION_ID,
                SystemConstants.LEVEL_DEFINITION_ID,
                SystemConstants.STRENGTH_DEFINITION_ID,
                SystemConstants.AGILITY_DEFINITION_ID,
                SystemConstants.VITALITY_DEFINITION_ID,
                SystemConstants.ENERGY_DEFINITION_ID,
                SystemConstants.COMMAND_DEFINITION_ID
        );
    }

    private void setCharacterAttributes(CharacterDTO characterDto) {
        Map<UUID, StatAttribute> statsMap = this.statAttributeService.getMapAttributeDefinitionIdToCharacterStats(
                characterDto.getCharacterId(), getCharacterAttributeIdList());

        this.setCharacterAttributes(characterDto, statsMap);

    }

    private void setCharacterAttributes(CharacterDTO characterDto, Map<UUID, StatAttribute> statsMap) {
        CharacterAttributesDTO characterAttributesDTO = new CharacterAttributesDTO();
        characterDto.setResets((int) statsMap.get(SystemConstants.RESETS_DEFINITION_ID).getValue());
        characterDto.setLevel((int) statsMap.get(SystemConstants.LEVEL_DEFINITION_ID).getValue());

        StatAttribute masterLevelAttribute = statsMap.get(SystemConstants.MASTER_LEVEL_DEFINITION_ID);

        if (masterLevelAttribute != null) { // master level can be null if character is not in the third class
            characterDto.setMasterLevel((int) masterLevelAttribute.getValue());
        }

        characterAttributesDTO.setStrength((int) statsMap.get(SystemConstants.STRENGTH_DEFINITION_ID).getValue());
        characterAttributesDTO.setAgility((int) statsMap.get(SystemConstants.AGILITY_DEFINITION_ID).getValue());
        characterAttributesDTO.setVitality((int) statsMap.get(SystemConstants.VITALITY_DEFINITION_ID).getValue());
        characterAttributesDTO.setEnergy((int) statsMap.get(SystemConstants.ENERGY_DEFINITION_ID).getValue());
        characterAttributesDTO.setCommand(0);

        if (SystemConstants.DL_CLASSES.contains(characterDto.getCharacterClassName())) {
            characterAttributesDTO.setCommand((int) statsMap.get(SystemConstants.COMMAND_DEFINITION_ID).getValue());
        }


        characterDto.setAttributes(characterAttributesDTO);
    }

}
