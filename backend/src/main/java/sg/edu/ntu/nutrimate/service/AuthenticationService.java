package sg.edu.ntu.nutrimate.service;

import sg.edu.ntu.nutrimate.entity.Administrator;
import sg.edu.ntu.nutrimate.entity.Customer;

public interface AuthenticationService {
    public Customer getAuthenticatedCustomer();
    public Administrator getAuthenticatedAdministrator();
}
