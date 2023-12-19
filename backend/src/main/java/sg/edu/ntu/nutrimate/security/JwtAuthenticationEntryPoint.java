package sg.edu.ntu.nutrimate.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import sg.edu.ntu.nutrimate.logger.LogHandler;
import sg.edu.ntu.nutrimate.logger.LogHandler.Level;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // @Autowired
    // private LoginAttemptService loginAttemptService;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException {
        LogHandler.handleAuthLog(Level.ERROR, "Cannot set user authentication: {} " + authException.getMessage());
        // response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized
        // " + authException.getMessage());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        Map<String, String> map = new HashMap<>();
        map.put("status", HttpStatus.valueOf(HttpServletResponse.SC_UNAUTHORIZED).getReasonPhrase());
        map.put("message", "Error: Unauthorized " + authException.getMessage());
        JSONObject jo = new JSONObject(map);

        PrintWriter writer = response.getWriter();
        writer.println(jo);

        // String message = authException.getMessage();
        // if (loginAttemptService.isBlocked()) {
        // message = "Your account is blocked as you have exceeded the number of
        // tries.";
        // }
        // else{
        // message = "Bad Credentials - Wrong username or password!";
        // }
        // response.setStatus(HttpStatus.UNAUTHORIZED.value());
        // PrintWriter writer = response.getWriter();
        // writer.println(message);
    }
}