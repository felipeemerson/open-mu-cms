package io.github.felipeemerson.openmuapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "`AttributeDefinition`", schema = "config")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AttributeDefinition {

    @Id
    @Column(name = "Id")
    private UUID id;

    @Column(name = "GameConfigurationId")
    private UUID gameConfigurationId;

    @Column(name = "Designation")
    private String designation;

    @Column(name = "Description")
    private String description;

    @OneToMany(mappedBy = "attribute", cascade =  CascadeType.ALL)
    private List<StatAttributeDefinition> statAttributeDefinitions;

}

