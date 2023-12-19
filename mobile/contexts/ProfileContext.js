import { createContext, useContext, useEffect, useState } from "react";
import { SecureStoreContext } from "./SecureStoreContext";
import axios from "axios";

export const ProfileContext = createContext({
  profile: {},
  handlerInitProfile: () => Promise(resolve, reject),
  resetProfile: () => {},
});

const initProfile = {
    customerID: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    contactNo: "",
    initial: "",
}

export function ProfileContextProvider({ children }) {
    const [profile, setProfile] = useState(initProfile);
    const secureStoreContext = useContext(SecureStoreContext);

    useEffect(() => {
      (async () => {
                
        try {
          const profile_str = await secureStoreContext.getCredentials("profile");
          console.log("initial profile check", profile_str);
          if(profile_str){
            const profile = JSON.parse(profile_str);
            handlerProfileChange(profile);
          }            
        } catch (error) {
          console.log(error);
        }    
  
      })();
    }, []);
  

    const handlerInitProfile = async (responseData) => {

      const userRole = responseData.roles[0] === 'ROLE_user' ? 
                                  'customers' : 'admin'
      const tokenType = responseData.tokenType;
      const accessToken = responseData.accessToken;

      return new Promise((resolve, reject) => {
        const url = `https://nutrimateapp-4ad28e15dbfd.herokuapp.com/nutrimate/${userRole}/profile`;
        axios
          .get(url, {
            headers: {
              Authorization: `${tokenType} ${accessToken}`,
            },
          })
          .then(({ data }) => {
            handlerInitProfileChange({ data });
            handleSecureProfile({ data });
            console.log(data);
            resolve("Profile Loaded");
          }, () => {        
            reject("Something went wrong");
          })
      })
      
    };

    const handlerInitProfileChange = ({data}) => {
        setProfile({
        ...profile,
        customerID: data.id,
        username: data.userID,
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        contactNo: data.contactNo,
        initial: `${data.firstName[0]}${data.lastName[0]}`
      });   
    };

    const handlerProfileChange = (data) => {
      setProfile({
      ...profile,
      customerID: data.customerID,
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      contactNo: data.contactNo,
      initial: data.initial
    });   
  };

    const handleSecureProfile = async ({data}) => {
      const profile = JSON.stringify({
        customerID: data.id,
        username: data.userID,
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        contactNo: data.contactNo,
        initial: `${data.firstName[0]}${data.lastName[0]}`
      });
      const promise = await secureStoreContext.saveCredentials("profile", profile);
      console.log("Secure Profile Status: ", promise);
    };

    // const secureProfile = async (data) => {
    //   console.log("retrieve Profile", data);
    //   const profile = JSON.stringify(data);
    //   await secureStoreContext.saveCredentials("profile", profile).then(
    //     (outcome) => {
    //       resolve(outcome);
    //     },
    //     (outcome) => {
    //       reject(outcome);
    //     }
    //   );
    // };

  const resetProfile = () => {
    setProfile(initProfile);
  }

  const profileContext = {
    profile: profile,
    handlerInitProfile: handlerInitProfile,
    resetProfile: resetProfile,
  };

  return (
    <ProfileContext.Provider value={profileContext}>
      {children}
    </ProfileContext.Provider>
  );
}
