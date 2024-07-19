package io.github.felipeemerson.openmuapi.repositories;

import io.github.felipeemerson.openmuapi.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    Optional<Account> findByLoginName(String loginName);

    boolean existsByLoginName(String loginName);

    boolean existsByEmail(String email);

}
