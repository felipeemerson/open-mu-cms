package io.github.felipeemerson.openmuapi.services;

import io.github.felipeemerson.openmuapi.dto.CharacterRankDTO;
import io.github.felipeemerson.openmuapi.dto.GuildDTO;
import io.github.felipeemerson.openmuapi.dto.GuildMemberDTO;
import io.github.felipeemerson.openmuapi.dto.GuildRankDTO;
import io.github.felipeemerson.openmuapi.entities.Guild;
import io.github.felipeemerson.openmuapi.entities.GuildMember;
import io.github.felipeemerson.openmuapi.enums.GuildPosition;
import io.github.felipeemerson.openmuapi.exceptions.BadRequestException;
import io.github.felipeemerson.openmuapi.exceptions.NotFoundException;
import io.github.felipeemerson.openmuapi.repositories.GuildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

import static java.lang.Thread.sleep;

@Service
public class GuildService {

    private final GuildRepository guildRepository;
    private final CharacterService characterService;
    private final GameServerService gameServerService;

    public GuildService(@Autowired GuildRepository guildRepository,
                        @Autowired CharacterService characterService,
                        @Lazy GameServerService gameServerService) {
        this.guildRepository = guildRepository;
        this.characterService = characterService;
        this.gameServerService = gameServerService;
    }

    public Object getGuildByName(String guildName) throws BadRequestException, NotFoundException {
        if (guildName == null || guildName.isBlank()) {
            throw new BadRequestException("Guild name is null or empty.");
        }

        Optional<Guild> guildOpt =  this.guildRepository.findByName(guildName);

        if (guildOpt.isEmpty()) {
            throw new NotFoundException(String.format("Guild %s was not found.", guildName));
        }

        Guild guild = guildOpt.get();
        List<UUID> charactersIds = guild.getMembers().stream().map(GuildMember::getId).toList();
        List<CharacterRankDTO> characterDTOList = this.characterService.getCharactersByIds(charactersIds);

        String[] onlines = gameServerService.getOnlinePlayers().getPlayersList();

        characterDTOList.forEach(character -> {
            character.setOnline(Arrays.stream(onlines).anyMatch(name -> name.equals(character.getCharacterName())));
        });

        return createGuildDTO(guild, characterDTOList);
    }

    private static GuildDTO createGuildDTO(Guild guild, List<CharacterRankDTO> characterDTOList) {
        GuildDTO guildDTO = new GuildDTO();

        Map<UUID, GuildPosition> charactersGuildPositionMap = new HashMap<>();
        guild.getMembers().forEach(
                guildMember -> charactersGuildPositionMap
                        .put(guildMember.getId(), guildMember.getStatus()));

        guildDTO.setId(guild.getId());
        guildDTO.setHostilityGuild(guild.getHostilityGuild());
        guildDTO.setAllianceGuild(guild.getAllianceGuild());
        guildDTO.setLogo(guild.getLogo());
        guildDTO.setName(guild.getName());
        guildDTO.setNotice(guild.getNotice());
        guildDTO.setScore(guild.getScore());
        guildDTO.setMembers(characterDTOList.stream().map(character -> {
            GuildMemberDTO guildMemberDTO = GuildMemberDTO.parseFromCharacterRankDto(character);
            GuildPosition guildPosition = charactersGuildPositionMap.get(character.getCharacterId());

            if (guildPosition.equals(GuildPosition.GUILD_MASTER)) {
                guildDTO.setGuildMaster(character.getCharacterName());
            }

            guildMemberDTO.setGuildPosition(guildPosition);
            return guildMemberDTO;
        }).toList());

        return guildDTO;
    }

    public Page<GuildRankDTO> getGuildsRanking(int page, int size) throws BadRequestException {
        validatePaginatedAttributes(page, size);

        Pageable pageable = PageRequest.of(page, size);

        return guildRepository.findGuildsRanked(pageable);
    }

    private static void validatePaginatedAttributes(int page, int size) throws BadRequestException {
        if (page < 0 || size < 1) {
            throw new BadRequestException("Page should be higher than -1 and size should be higher than 0.");
        }
    }
}
