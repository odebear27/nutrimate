package sg.edu.ntu.nutrimate.security;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.ntu.nutrimate.exception.InvalidCredentialsException;

// @CrossOrigin(origins={"http://localhost:3000/"}, allowCredentials = "true")
@CrossOrigin(origins = "*", maxAge = 3600)
// @CrossOrigin(origins={"https://localhost:3001/"}, allowCredentials = "true",
// methods = {RequestMethod.GET, RequestMethod.POST})
// @CrossOrigin(origins={"https://localhost:3001/"}, allowCredentials = "true")
@RestController
@RequestMapping("/nutrimate")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserSecurityServiceImpl userSecurityService;

    @Autowired
    private LoginAttemptService loginAttemptService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/basicauth")
    public ResponseEntity<String> basicAuthentication() {
        String userDisplayName = userSecurityService.getAuthenticatedUserName();
        return new ResponseEntity<>(userDisplayName, HttpStatus.OK);
        // return new ResponseEntity<>("Authenticated", HttpStatus.OK);
    }

    @PostMapping("/authentication")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthenticationRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            AuthenticatedUser userDetails = (AuthenticatedUser) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(new AuthenticationJwtResponse(jwt, userDetails.getUsername(), roles));
        } catch (BadCredentialsException e) {

            String message = "";

            if (loginAttemptService.isBlocked()) {
                message = "Your account is blocked as you have exceeded the number of tries.";
            } else {
                message = "Bad Credentials - Wrong username or password!";
            }
            // return new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
            throw new InvalidCredentialsException(message);
        }
    }

    // @CrossOrigin(allowedHeaders = {"Authorization", "Content-Type", "Accept"})
    // @PostMapping("/logout")
    // public ResponseEntity<Object> logout() {
    // final HttpHeaders httpHeaders= new HttpHeaders();
    // httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    // return new ResponseEntity<>("status: Logged Out", httpHeaders,
    // HttpStatus.OK);
    // }

    @GetMapping("/logout")
    public void logout() {
        // return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
