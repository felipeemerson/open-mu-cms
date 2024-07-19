package io.github.felipeemerson.openmuapi.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordDTO {

    @NotBlank
    @Size(min = 3, max = 20)
    private String currentPassword;

    @NotBlank
    @Size(min = 3, max = 20)
    private String nextPassword;

    @NotBlank
    @Size(min = 3, max = 20)
    private String confirmNextPassword;

}
