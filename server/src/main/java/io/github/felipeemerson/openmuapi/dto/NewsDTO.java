package io.github.felipeemerson.openmuapi.dto;

import io.github.felipeemerson.openmuapi.entities.News;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewsDTO {

    private UUID id;

    private UUID authorId;

    @NotBlank
    @Size(min = 3, max = 10)
    private String authorName;

    private String category;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    private Timestamp creationDate;

    private Timestamp lastUpdatedDate;

    public static News mapNewsDTOToNews(NewsDTO newsDTO) {
        News news = new News();

        news.setAuthorName(newsDTO.getAuthorName());
        news.setCategory(newsDTO.getCategory());
        news.setTitle(newsDTO.getTitle());
        news.setContent(newsDTO.getContent());
        news.setCreationDate(newsDTO.getCreationDate());
        news.setLastUpdatedDate(newsDTO.getLastUpdatedDate());

        return news;
    }

}
