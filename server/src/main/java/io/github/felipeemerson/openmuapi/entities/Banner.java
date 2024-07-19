package io.github.felipeemerson.openmuapi.entities;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "`Banner`", schema = "cms")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Banner {

    @Id
    @Column(name = "Id")
    @Nullable
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    @Column(name = "ImageUrl")
    private String imageUrl;

    @NotNull
    @Column(name = "HasLink")
    private Boolean hasLink;

    @Nullable
    @Column(name = "IsExternalLink")
    private Boolean isExternalLink;

    @Nullable
    @Column(name = "Link")
    private String link;

    @NotNull
    @Column(name = "OrderIndex")
    private Integer orderIndex;

}
