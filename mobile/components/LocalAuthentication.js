import { StyleSheet, View, } from "react-native";
import {Button, } from "react-native-paper";
import React, { useContext, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthContext } from "../contexts/AuthenticateContext";
import { SecureStoreContext } from "../contexts/SecureStoreContext";

export default function CustomLocalAuthentication() {
  const authContext = useContext(AuthContext);
  const secureStoreContext = useContext(SecureStoreContext);

  const handleBiometricAuth = async () => {
    try {
      authContext.setComponentDisabled(true);
      authContext.setInProgress(true);

      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        disableDeviceFallback: true,
        cancelLabel: "Cancel",
      });
      if (biometricAuth.success) {
        authContext.setShowAuthError(false);
        authContext.setAuthErrorMessage("");
        authContext.setComponentDisabled(false);
        authContext.setInProgress(false);
        authContext.setLoginStatus(true);
      }
      else{
        console.log(biometricAuth);
      }
    } catch (error) {
      console.log(error);
      authContext.setAccessToken(null);
      authContext.handlerRoleChange("");
      authContext.setTokenType(null);
      authContext.setShowAuthError(true);
      authContext.setAuthErrorMessage("Biometric authentication failed");
      authContext.setLoginStatus(false);
      authContext.setLogoutStatus(false);
      authContext.resetCredentials();
      authContext.setComponentDisabled(false);
      authContext.setInProgress(false);
    }
  };

  return (
    <View style={styles.buttonView}>
      <Button
        style={{ backgroundColor: "#43521A" }}
        labelStyle={
          authContext.isComponentDisabled
            ? {
                fontSize: 16,
                color: "gray",
                fontWeight: "500",
              }
            : {
                fontSize: 16,
                color: "#fff",
                fontWeight: "900",
              }
        }
        // icon="face-recognition"
        icon={secureStoreContext.biometricTypes}
        mode="outlined"
        onPress={handleBiometricAuth}
        disabled={authContext.isComponentDisabled}
      >       
        Biometric Authentication
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    width: "95%",
    height: 50,
    marginTop: 0,
    marginBottom: 20,
    alignItems: "stretch",
  },
});