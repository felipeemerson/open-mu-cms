package io.github.felipeemerson.openmuapi.services;

import io.github.felipeemerson.openmuapi.dto.AccountDTO;
import io.github.felipeemerson.openmuapi.dto.AccountRegistrationDTO;
import io.github.felipeemerson.openmuapi.dto.ChangePasswordDTO;
import io.github.felipeemerson.openmuapi.dto.CharacterRankDTO;
import io.github.felipeemerson.openmuapi.entities.Account;
import io.github.felipeemerson.openmuapi.entities.Character;
import io.github.felipeemerson.openmuapi.entities.GuildMember;
import io.github.felipeemerson.openmuapi.entities.ItemStorage;
import io.github.felipeemerson.openmuapi.enums.AccountState;
import io.github.felipeemerson.openmuapi.exceptions.BadRequestException;
import io.github.felipeemerson.openmuapi.exceptions.ForbiddenException;
import io.github.felipeemerson.openmuapi.exceptions.NotFoundException;
import io.github.felipeemerson.openmuapi.repositories.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static java.lang.Thread.sleep;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final CharacterService characterService;
    private final PasswordEncoder passwordEncoder;

    public AccountService(@Autowired AccountRepository accountRepository,
                          @Autowired CharacterService characterService,
                          @Autowired PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.characterService = characterService;
        this.passwordEncoder = passwordEncoder;
    }

    public AccountDTO createAccount(AccountRegistrationDTO registrationDTO) throws BadRequestException {
        if (!registrationDTO.getPassword().equals(registrationDTO.getConfirmPassword())) {
            throw new BadRequestException("Password and confirm password don't match");
        }

        Account newAccount = new Account();
        newAccount.setId(UUID.randomUUID());
        newAccount.setLoginName(registrationDTO.getLoginName());
        newAccount.setEmail(registrationDTO.getEmail());
        newAccount.setPasswordHash(passwordEncoder.encode(registrationDTO.getPassword()));
        newAccount.setState(AccountState.NORMAL);
        newAccount.setRegistrationDate(new Timestamp(new Date().getTime()));
        newAccount.setSecurityCode("");
        newAccount.setTimeZone((short) 0);
        newAccount.setVaultPassword("");
        newAccount.setVaultExtended(false);

        ItemStorage itemStorage = new ItemStorage();
        itemStorage.setId(UUID.randomUUID());
        itemStorage.setMoney(0);

        newAccount.setVault(itemStorage);

        AccountDTO accountDTO = mapNewAccountToAccountDTO(accountRepository.save(newAccount));
        accountDTO.setCharacters(List.of());

        return accountDTO;
    }

    public Account getAccountByLoginName(String loginName) throws NotFoundException {
        Optional<Account> accountOpt = this.accountRepository.findByLoginName(loginName);

        if (accountOpt.isEmpty()) {
            throw new NotFoundException(String.format("Account %s not found.", loginName));
        }

        return accountOpt.get();
    }

    public AccountDTO getAccountDTOByLoginName(String loginName) throws NotFoundException {
        Account account = getAccountByLoginName(loginName);

        List<UUID> charactersIds = account.getCharacters().stream().map(Character::getId).toList();
        List<CharacterRankDTO> characterDTOList = this.characterService.getCharactersByIds(charactersIds);

        AccountDTO accountDTO = mapNewAccountToAccountDTO(account);
        accountDTO.setCharacters(characterDTOList);

        return accountDTO;
    }

    public Account getAccountAndCheckPrivileges(String loginName) throws ForbiddenException, NotFoundException {
        Account account = this.getAccountByLoginName(loginName);

        if (!account.getState().equals(AccountState.GAME_MASTER)) {
            throw new ForbiddenException("Your account doesn't have the required privileges.");
        }

        return account;
    }

    public static AccountDTO mapNewAccountToAccountDTO(Account account) {
        AccountDTO accountDTO = new AccountDTO();

        accountDTO.setLoginName(account.getLoginName());
        accountDTO.setId(account.getId());
        accountDTO.setEmail(account.getEmail());
        accountDTO.setRegistrationDate(account.getRegistrationDate());
        accountDTO.setVaultExtended(account.isVaultExtended());
        accountDTO.setVaultPassword(account.getVaultPassword());
        accountDTO.setState(account.getState());
        accountDTO.setChatBanUntil(account.getChatBanUntil());

        return accountDTO;
    }

    public void changePassword(String loginName, ChangePasswordDTO changePasswordDTO) throws NotFoundException, BadRequestException {
        Account account = this.getAccountByLoginName(loginName);

        if (!this.passwordEncoder.matches(changePasswordDTO.getCurrentPassword(), account.getPasswordHash())) {
            throw new BadRequestException("Current password is wrong.");
        }

        if (!changePasswordDTO.getNextPassword().equals(changePasswordDTO.getConfirmNextPassword())) {
            throw new BadRequestException("Next password and confirmation don't match.");
        }

        account.setPasswordHash(this.passwordEncoder.encode(changePasswordDTO.getNextPassword()));

        this.accountRepository.save(account);
    }

}
