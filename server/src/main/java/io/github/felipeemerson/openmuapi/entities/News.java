package io.github.felipeemerson.openmuapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "`News`", schema = "cms")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class News {

    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AuthorId")
    @JsonIgnore
    private Character author;

    @Column(name = "Author")
    private String authorName;

    @Column(name = "Category")
    private String category;

    @Column(name = "Title")
    private String title;

    @Column(name = "Content")
    private String content;

    @Column(name = "CreationDate")
    private Timestamp creationDate;

    @Column(name = "LastUpdatedDate")
    private Timestamp lastUpdatedDate;

}
