package io.github.felipeemerson.openmuapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "ItemStorage", schema = "data")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ItemStorage {

    @Id
    @Column(name = "Id")
    private UUID id;

    @Column(name = "Money")
    private int money;

    @OneToMany(mappedBy = "inventory", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("inventory")
    private List<Character> characters;

}

