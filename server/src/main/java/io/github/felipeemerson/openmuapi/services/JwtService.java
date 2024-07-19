package io.github.felipeemerson.openmuapi.services;

import io.github.felipeemerson.openmuapi.enums.AccountState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.time.Instant;

@Component
public class JwtService {

    @Autowired
    private JwtDecoder jwtDecoder;

    @Autowired
    private JwtEncoder jwtEncoder;

    public String extractUsername(String token) {
        return jwtDecoder.decode(token).getSubject();
    }

    public Instant extractExpiration(String token) {
        return jwtDecoder.decode(token).getExpiresAt();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).isBefore(Instant.now());
    }

    public String generateToken(String username, AccountState accountState) throws ParseException {
        Instant now = Instant.now();
        int sevenDaysInSeconds = 60 * 60 * 24 * 7;
        Instant expiry = now.plusSeconds(sevenDaysInSeconds);

        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .subject(username)
                .issuedAt(now)
                .expiresAt(expiry)
                .claim("role", accountState.name())
                .build();

        JwtEncoderParameters params = JwtEncoderParameters.from(jwtClaimsSet);

        return jwtEncoder.encode(params).getTokenValue();
    }
}
