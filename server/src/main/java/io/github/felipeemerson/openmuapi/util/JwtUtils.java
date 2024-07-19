package io.github.felipeemerson.openmuapi.util;

import org.springframework.security.oauth2.jwt.Jwt;

public class JwtUtils {

    public static String getLoginNameFromToken(Jwt token) {
        return token.getSubject();
    }

    public static String getRole(Jwt token) {
        return token.getClaim("role");
    }

}
