package sg.edu.ntu.nutrimate.service;

import sg.edu.ntu.nutrimate.entity.Administrator;
import sg.edu.ntu.nutrimate.entity.PasswordDataObject;

public interface AdministratorService {
    public Administrator createAdministratorAccount(Administrator administrator);
    public Administrator getAdminProfile();
    public Administrator updateAdminAccountPassword(PasswordDataObject passwordDTO);    
    public Administrator updateAdminProfile(Administrator administrator);
    public void resetAdminAccountPassword(String userID, String appURL);
    public void changeAdminAccountPassword(PasswordDataObject passwordDTO);
}
