package sg.edu.ntu.nutrimate.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import sg.edu.ntu.nutrimate.logger.LogHandler;
import sg.edu.ntu.nutrimate.logger.LogHandler.Level;

@Component
public class JwtUtils {

  @Value("${nutrimateapp.jwtSecret}")
  private String jwtSecret;

  @Value("${nutrimateapp.jwtExpirationMs}")
  private int jwtExpirationMs;

  public String generateJwtToken(Authentication authentication) {

    AuthenticatedUser userPrincipal = (AuthenticatedUser) authentication.getPrincipal();

    return Jwts.builder()
        .setSubject((userPrincipal.getUsername()))
        .setIssuedAt(new Date())
        .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
        .signWith(key(), SignatureAlgorithm.HS256)
        .compact();
  }
  
  private Key key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String getUserNameFromJwtToken(String token) {
    return Jwts.parserBuilder().setSigningKey(key()).build()
               .parseClaimsJws(token).getBody().getSubject();
  }

  public boolean validateJwtToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
      return true;
    } catch (MalformedJwtException e) {
      LogHandler.handleAuthLog(Level.ERROR, "Invalid JWT token: {} " + e.getMessage());
    } catch (ExpiredJwtException e) {
      LogHandler.handleAuthLog(Level.ERROR, "JWT token is expired: {} " + e.getMessage());
    } catch (UnsupportedJwtException e) {
      LogHandler.handleAuthLog(Level.ERROR, "JWT token is unsupported: {} " + e.getMessage());
    } catch (IllegalArgumentException e) {
      LogHandler.handleAuthLog(Level.ERROR, "JWT claims string is empty: {} "+ e.getMessage());
    }

    return false;
  }
}


