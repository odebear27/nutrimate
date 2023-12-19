package sg.edu.ntu.nutrimate.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sg.edu.ntu.nutrimate.entity.Administrator;
import sg.edu.ntu.nutrimate.entity.PasswordDataObject;
import sg.edu.ntu.nutrimate.repository.AdministratorRepository;

@Service
public class AdministratorServiceImpl implements AdministratorService {

    @Autowired
    AdministratorRepository administratorRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Override
    public Administrator createAdministratorAccount(Administrator administrator) {
        throw new UnsupportedOperationException("Unimplemented method 'createAdministratorAccount'");
    }

    @Override
    public Administrator getAdminProfile() {
        Administrator authenticatedAdmin= authenticationService.getAuthenticatedAdministrator();
        authenticatedAdmin.setPassword("");

        return authenticatedAdmin;
    }

    @Override
    public Administrator updateAdminAccountPassword(PasswordDataObject passwordDTO) {
        throw new UnsupportedOperationException("Unimplemented method 'updateAdminProfile'");
    }

    @Override
    public Administrator updateAdminProfile(Administrator administrator) {
        
        Administrator authenticatedAdmin = authenticationService.getAuthenticatedAdministrator();

        authenticatedAdmin.setFirstName(administrator.getFirstName().toUpperCase());
        authenticatedAdmin.setLastName(administrator.getLastName().toUpperCase());  

        // existingCustomer.setPassword(userSecurityService.changePassword(customer.getPassword()));
        authenticatedAdmin.setContactNo(administrator.getContactNo());

        return administratorRepository.save(authenticatedAdmin);
    }

    @Override
    public void resetAdminAccountPassword(String userID, String appURL) {
        throw new UnsupportedOperationException("Unimplemented method 'resetAdminAccountPassword'");
    }

    @Override
    public void changeAdminAccountPassword(PasswordDataObject passwordDTO) {
        throw new UnsupportedOperationException("Unimplemented method 'changeAdminAccountPassword'");
    }
    
}
