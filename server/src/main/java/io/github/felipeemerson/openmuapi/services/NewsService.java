package io.github.felipeemerson.openmuapi.services;

import io.github.felipeemerson.openmuapi.dto.CharacterRankDTO;
import io.github.felipeemerson.openmuapi.dto.NewsDTO;
import io.github.felipeemerson.openmuapi.entities.Account;
import io.github.felipeemerson.openmuapi.entities.Character;
import io.github.felipeemerson.openmuapi.entities.News;
import io.github.felipeemerson.openmuapi.enums.AccountState;
import io.github.felipeemerson.openmuapi.exceptions.BadRequestException;
import io.github.felipeemerson.openmuapi.exceptions.ForbiddenException;
import io.github.felipeemerson.openmuapi.exceptions.NotFoundException;
import io.github.felipeemerson.openmuapi.repositories.NewsRepository;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static java.lang.Thread.sleep;

@Service
public class NewsService {

    private final NewsRepository newsRepository;
    private final AccountService accountService;

    public NewsService(@Autowired NewsRepository newsRepository,
                       @Autowired AccountService accountService) {
        this.newsRepository = newsRepository;
        this.accountService = accountService;
    }

    public News createNews(NewsDTO newsDTO, String loginName) throws ForbiddenException, BadRequestException, NotFoundException {
        Account account = this.accountService.getAccountAndCheckPrivileges(loginName);

        Character character = findCharacterByName(account.getCharacters(), newsDTO.getAuthorName());

        News news = NewsDTO.mapNewsDTOToNews(newsDTO);
        news.setAuthor(character);
        news.setCreationDate(new Timestamp(new Date().getTime()));

        return this.newsRepository.save(news);
    }

    public Page<News> getNews(int page, int size, Sort.Direction sortDirection) throws BadRequestException {
        validatePaginatedAttributes(page, size);

        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, "creationDate"));

        return this.newsRepository.findAll(pageable);
    }

    public News getNewsById(UUID newsId) throws NotFoundException {
        Optional<News> newsOpt = this.newsRepository.findById(newsId);

        if (newsOpt.isEmpty()) {
            throw new ForbiddenException(String.format("News with id %s was not found.", newsId));
        }

        return newsOpt.get();
    }

    public News updateNews(NewsDTO newsDTO, String loginName) throws ForbiddenException, BadRequestException, NotFoundException {
        News news = this.getNewsById(newsDTO.getId());

        Account account = this.accountService.getAccountAndCheckPrivileges(loginName);

        if (!newsDTO.getAuthorName().equals(news.getAuthorName())) {
            Character character = findCharacterByName(account.getCharacters(), newsDTO.getAuthorName());

            news.setAuthor(character);
            news.setAuthorName(newsDTO.getAuthorName());
        }

        news.setTitle(newsDTO.getTitle());
        news.setContent(newsDTO.getContent());
        news.setCategory(newsDTO.getCategory());
        news.setLastUpdatedDate(new Timestamp(new Date().getTime()));

        return this.newsRepository.save(news);
    }

    public void deleteNews(UUID newsId, String loginName) throws  NotFoundException, ForbiddenException {
        News news = this.getNewsById(newsId);

        this.accountService.getAccountAndCheckPrivileges(loginName);

        this.newsRepository.delete(news);
    }

    private Character findCharacterByName(List<Character> characters, String characterName) throws BadRequestException {
        Optional<Character> characterOpt = characters.stream()
                .filter(ch -> ch.getName().equals(characterName))
                .findFirst();

        if (characterOpt.isEmpty()) {
            throw new BadRequestException("Author name invalid.");
        }

        return characterOpt.get();
    }

    private static void validatePaginatedAttributes(int page, int size) throws BadRequestException {
        if (page < 0 || size < 1) {
            throw new BadRequestException("Page should be higher than -1 and size should be higher than 0.");
        }
    }

}
