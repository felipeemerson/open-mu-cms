package io.github.felipeemerson.openmuapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.github.felipeemerson.openmuapi.enums.GuildPosition;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "`GuildMember`", schema = "guild")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuildMember {
    @Id
    @Column(name = "Id")
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "GuildId")
    @JsonIgnoreProperties("members")
    private Guild guild;

    @Column(name = "Status")
    @Enumerated(EnumType.ORDINAL)
    private GuildPosition status;
}

