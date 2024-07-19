package io.github.felipeemerson.openmuapi.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "`StatAttributeDefinition`", schema = "config")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class StatAttributeDefinition {

    @Id
    @Column(name = "Id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "AttributeId")
    private AttributeDefinition attribute;

    @ManyToOne
    @JoinColumn(name = "CharacterClassId")
    private CharacterClass characterClass;

    @Column(name = "BaseValue", nullable = false)
    private float baseValue;

    @Column(name = "IncreasableByPlayer", nullable = false)
    private boolean increasableByPlayer;

}
