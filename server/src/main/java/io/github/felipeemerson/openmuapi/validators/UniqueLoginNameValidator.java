package io.github.felipeemerson.openmuapi.validators;

import io.github.felipeemerson.openmuapi.repositories.AccountRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueLoginNameValidator implements ConstraintValidator<UniqueLoginName, String> {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public boolean isValid(String loginName, ConstraintValidatorContext context) {
        if (this.accountRepository == null) {
            return true;
        }
        return !this.accountRepository.existsByLoginName(loginName);
    }
}