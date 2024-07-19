package io.github.felipeemerson.openmuapi.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.github.felipeemerson.openmuapi.enums.AccountState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "`Account`", schema = "data")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Account {

    @Id
    @Column(name = "Id")
    private UUID id;

    @Column(name = "LoginName")
    private String loginName;

    @Column(name = "PasswordHash")
    private String passwordHash;

    @Column(name = "SecurityCode")
    private String securityCode;

    @Column(name = "EMail")
    private String email;

    @Column(name = "RegistrationDate")
    private Timestamp registrationDate;

    @Column(name = "State")
    private AccountState state;

    @Column(name = "TimeZone")
    private short timeZone;

    @Column(name = "VaultPassword")
    private String vaultPassword;

    @Column(name = "IsVaultExtended")
    private boolean isVaultExtended;

    @Column(name = "ChatBanUntil")
    private Timestamp chatBanUntil;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "VaultId")
    private ItemStorage vault;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("account")
    private List<Character> characters;

}

