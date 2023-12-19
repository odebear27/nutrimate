import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from "expo-local-authentication";
import { AuthContext } from "./AuthenticateContext";

export const SecureStoreContext = createContext({
  saveCredentials: () => Promise(resolve, reject),
  getCredentials: () => Promise(resolve, reject),
  deleteCredentials: () => Promise(resolve, reject),
  isBiometricSupported: false,
  setIsBiometricSupported: () => {},
  isbiometricEnrolled: false,
  setBiometricEnrolled: () => {},
  isbiometricInitiated: false,
  setBiometricInitiated: () => {},
  biometricTypes: "",
  setBiometricTypes: () => {},
});

export function SecureStoreContextProvider({ children }) {
  const authContext = useContext(AuthContext);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isbiometricEnrolled, setBiometricEnrolled] = useState(false);
  const [isbiometricInitiated, setBiometricInitiated] = useState(false);
  const [biometricTypes, setBiometricTypes] = useState("None");

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      const enroll = await LocalAuthentication.isEnrolledAsync();
      setBiometricEnrolled(enroll);

      const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      setBiometricTypes(biometricTypes);

      try {
        biometricTypes.length == 0
          ? setBiometricTypes("")
          : biometricTypes[0] ===
            LocalAuthentication.AuthenticationType.FINGERPRINT
          ? setBiometricTypes("fingerprint")
          : setBiometricTypes("face-recognition");

        const username = await getCredentials("username");
        console.log("initial userID check", username);
        username ? setBiometricInitiated(true) : setBiometricInitiated(false);
        const accessToken = await getCredentials("accessToken");
        console.log("initial token check", accessToken);
        authContext.setAccessToken(accessToken);
        authContext.setTokenType("Bearer");
        // accessToken ? authContext.setLoginStatus(true) : authContext.setLoginStatus(false);
      } catch (error) {
        console.log(error);
      }    

    })();
  }, []);

  const saveCredentials = async (key, value) => {
    return new Promise((resolve, reject) => {
      SecureStore.setItemAsync(key, value).then(
        () => {
          resolve("Value securely stored");
        },
        () => {
          reject("Secure Store- Unable to store value");
        }
      );
      // .then(() => {
      //   reject("Secure Store- Unable to store value");
      // });
    });
  };

  const getCredentials = (key) => {
    return new Promise((resolve, reject) => {
      SecureStore.getItemAsync(key)
        .then((data) => {
          resolve(data);
        },
        (error) => {
          reject(error + "Error retrieving key-value");
        });
        // .then(() => {
        //   reject("Error retrieving key-value");
        // });
    });
  };

  const deleteCredentials = (key) => {
    return new Promise((resolve, reject) => {
      SecureStore.deleteItemAsync(key).then(
        () => {
          resolve("Deleted");
        },
        (error) => {
          reject("id cannot be deleted");
        }
      );
    });
  };

  const secureStoreContext = {
    saveCredentials: saveCredentials,
    getCredentials: getCredentials,
    deleteCredentials: deleteCredentials,
    isBiometricSupported: isBiometricSupported,
    setIsBiometricSupported: setIsBiometricSupported,
    isbiometricEnrolled: isbiometricEnrolled,
    setBiometricEnrolled: setBiometricEnrolled,
    isbiometricInitiated: isbiometricInitiated,
    setBiometricInitiated: setBiometricInitiated,
    biometricTypes: biometricTypes,
    setBiometricTypes: setBiometricTypes
  };

  return (
    <SecureStoreContext.Provider value={secureStoreContext}>
      {children}
    </SecureStoreContext.Provider>
  );
}
