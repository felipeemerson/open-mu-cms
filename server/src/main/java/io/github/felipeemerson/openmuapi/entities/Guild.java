package io.github.felipeemerson.openmuapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "`Guild`", schema = "guild")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Guild {
    @Id
    @Column(name = "Id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HostilityId")
    @JsonIgnoreProperties("members")
    private Guild hostilityGuild;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AllianceGuildId")
    @JsonIgnoreProperties("members")
    private Guild allianceGuild;

    @Column(name = "Name")
    private String name;

    @Column(name = "Logo")
    private byte[] logo;

    @Column(name = "Score")
    private int score;

    @Column(name = "Notice")
    private String notice;

    @OneToMany(mappedBy = "guild", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("guild")
    private List<GuildMember> members;
}
