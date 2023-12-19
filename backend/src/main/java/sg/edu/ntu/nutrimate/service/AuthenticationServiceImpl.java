package sg.edu.ntu.nutrimate.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import sg.edu.ntu.nutrimate.entity.Administrator;
import sg.edu.ntu.nutrimate.entity.Customer;
import sg.edu.ntu.nutrimate.repository.AdministratorRepository;
import sg.edu.ntu.nutrimate.repository.CustomerRepository;
import sg.edu.ntu.nutrimate.security.AuthenticatedUser;

@Service
public class AuthenticationServiceImpl implements AuthenticationService{

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private AdministratorRepository administratorRepository;

    // public AuthenticationServiceImpl(CustomerRepository customerRepository, AdministratorRepository administratorRepository) {       
    //     this.customerRepository = customerRepository;
    //     this.administratorRepository = administratorRepository; 
    // }

    @Override
    public Customer getAuthenticatedCustomer() {
        String username = ((AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();

        Optional<Customer> customerContainer = customerRepository.findByUserID(username.toLowerCase());

        if(!customerContainer.isPresent()){
            customerContainer = customerRepository.findByEmail(username.toLowerCase());
        }

        if (!customerContainer.isPresent()) {
               throw new BadCredentialsException("Invalid Username");
        }

        return customerContainer.get();       
    }

    @Override
    public Administrator getAuthenticatedAdministrator() {

        String username = ((AuthenticatedUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();

        Optional<Administrator> adminContainer = administratorRepository.findByEmail(username.toLowerCase());

        if (!adminContainer.isPresent()) {
               throw new BadCredentialsException("Invalid Username");
        }

        return adminContainer.get();
    }
    
}
