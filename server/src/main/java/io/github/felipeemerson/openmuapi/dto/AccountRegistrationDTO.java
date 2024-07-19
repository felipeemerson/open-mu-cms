package io.github.felipeemerson.openmuapi.dto;


import io.github.felipeemerson.openmuapi.validators.UniqueEmail;
import io.github.felipeemerson.openmuapi.validators.UniqueLoginName;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountRegistrationDTO {

    @NotBlank
    @UniqueLoginName
    @Size(min = 3, max = 10)
    private String loginName;

    @NotBlank
    @UniqueEmail
    @Pattern(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$", message = "invalid email")
    private String email;

    @NotBlank
    @Size(min = 3, max = 20)
    private String password;

    @NotBlank
    @Size(min = 3, max = 20)
    private String confirmPassword;

}
