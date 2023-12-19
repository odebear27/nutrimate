package sg.edu.ntu.nutrimate.security;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.context.WebApplicationContext;

@Configuration
@EnableWebSecurity
public class JwtSecurityConfiguration {
    
    @Autowired
    private WebApplicationContext applicationContext;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    // @Autowired
    // private LoginAttemptService loginAttemptService;

    @Autowired
    private JwtAuthenticationEntryPoint autheEntryPoint;

    // @Autowired
    // private AppBasicAuthenticationEntryPoint authenticationEntryPoint;

    // @Bean
    // public UserDetailsManager users(HttpSecurity http) throws Exception {
    // AuthenticationManager authenticationManager =
    // http.getSharedObject(AuthenticationManagerBuilder.class)
    // .userDetailsService(userDetailsService)
    // .passwordEncoder(passwordEncoder())
    // .and()
    // .authenticationProvider(authenticationProvider())
    // .build();
    // }

    @PostConstruct
    public void completeSetup() {
        userDetailsService = applicationContext.getBean(CustomUserDetailsService.class);
    }

    @Bean
    public AuthenticationTokenFilter authenticationJwtTokenFilter(){
        return new AuthenticationTokenFilter();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        final DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
      return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .headers()
                .frameOptions().disable()                
                .and()
                .authorizeRequests()
                .antMatchers("/")
                .permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/signin")
                .permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/static/**")
                .permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/h2/**")
                .permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/nutrimate/public/**")
                .permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/nutrimate/authentication")
                .permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/nutrimate/basicauth")
                .permitAll()                
                .and()
                .authorizeRequests()
                .antMatchers("/nutrimate/customers/**")
                .hasRole("user")
                .and()
                .authorizeRequests()
                .antMatchers("/nutrimate/admin/**")
                .hasRole("admin")
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(exception -> exception.authenticationEntryPoint(autheEntryPoint))
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }   

    // @Bean
    // public AuthenticationFailureHandler authenticationFailureHandler() {
    //     return new CustomAuthenticationFailureHandler();
    // }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(8);
    }

}