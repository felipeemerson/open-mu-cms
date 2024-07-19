package io.github.felipeemerson.openmuapi.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "`StatAttribute`", schema = "data")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class StatAttribute {
    @Id
    @Column(name = "Id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DefinitionId")
    @JsonIgnoreProperties({"attributeDefinition", "character", "account"})
    private AttributeDefinition attributeDefinition;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CharacterId")
    private Character character;

    @Column(name = "Value")
    private float value;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AccountId")
    private Account account;
}

