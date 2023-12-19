package sg.edu.ntu.nutrimate.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.ntu.nutrimate.entity.Administrator;
import sg.edu.ntu.nutrimate.entity.PasswordDataObject;
import sg.edu.ntu.nutrimate.service.AdministratorService;

// @CrossOrigin(origins={"http://localhost:3000/"}, allowCredentials = "true")
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/nutrimate")
public class AdministratorController {

    @Autowired
    AdministratorService administratorService;
    
    @PostMapping("/admin/create")
    public ResponseEntity<Administrator> createAdminAccount(@Valid @RequestBody Administrator administrator){
        Administrator newAdmin = administratorService.createAdministratorAccount(administrator);
        return new ResponseEntity<>(newAdmin, HttpStatus.CREATED);
    }

    @GetMapping("/admin/profile")
    public ResponseEntity<Administrator> retrieveAdminProfile() {
        Administrator administrator = administratorService.getAdminProfile();
        return new ResponseEntity<>(administrator, HttpStatus.OK);
    }

    @PostMapping("admin/changepassword")    
    public ResponseEntity<Administrator> updateAdminAccountPassword(@Valid @RequestBody PasswordDataObject passwordDTO){
        administratorService.updateAdminAccountPassword(passwordDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("admin/updateprofile")    
    public ResponseEntity<Administrator> updateAdminProfile (@Valid @RequestBody Administrator administrator ){
        administratorService.updateAdminProfile(administrator);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("admin/forgetpassword")    
    public ResponseEntity<Administrator> handleAdminResetPassword (HttpServletRequest request, @RequestParam(required = false, defaultValue = "unknown") String username){
        administratorService.resetAdminAccountPassword(username, getAppUrl(request));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("admin/resetchangepassword")    
    public ResponseEntity<Administrator> handleAdminResetChangePassword (@RequestParam(required = false, defaultValue = "unknown") String token, @RequestBody PasswordDataObject passwordDTO){
        passwordDTO.setToken(token);
        administratorService.changeAdminAccountPassword(passwordDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private String getAppUrl(HttpServletRequest request) {
        return "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
    }
}
