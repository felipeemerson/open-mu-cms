package io.github.felipeemerson.openmuapi.validators;

import io.github.felipeemerson.openmuapi.repositories.AccountRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (this.accountRepository == null) {
            return true;
        }
        return !this.accountRepository.existsByEmail(email);
    }
}