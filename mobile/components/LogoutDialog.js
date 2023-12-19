import { Dialog, Portal, Text, Button} from "react-native-paper";
import { AuthContext } from "../contexts/AuthenticateContext";
import { useContext } from "react";
import { SecureStoreContext } from "../contexts/SecureStoreContext";

export default function LogoutDialog({ visibility, handlerDialogVisible, handlerInProgress, handlerComponentDisabled, handlerErrorMessage, handlerShowError}) {
  const authContext = useContext(AuthContext);
  const secureStoreContext = useContext(SecureStoreContext);

  const logout = async () => {
    try {
      const idPromise = await secureStoreContext.deleteCredentials("username");
      const tokenPromise = await secureStoreContext.deleteCredentials("accessToken");
      const Promise = await secureStoreContext.deleteCredentials("profile");

      handlerErrorMessage("");
      handlerShowError(false);

      authContext.setAccessToken(null);
      authContext.handlerRoleChange("");
      authContext.setTokenType(null);
      authContext.setLoginStatus(false);
      authContext.setLogoutStatus(false);
      authContext.resetCredentials();

      secureStoreContext.setBiometricInitiated(false);

      handlerComponentDisabled(false);
      handlerInProgress(false);
    } catch (error) {
      handlerComponentDisabled(false);
      handlerInProgress(false);

      handlerErrorMessage("SOmething went wrong. Please try again.");
      handlerShowError(false);
    }
  };

  const cancel = () => {
    handlerDialogVisible(!visibility);
    handlerComponentDisabled(false);
    handlerInProgress(false);
  };

  return (
    <Portal>
      <Dialog visible={visibility} onDismiss={cancel}>
        <Dialog.Title>Logging Out</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">
            {
              "Are you sure you want to log out of the app?"
            }
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={logout}>confirm</Button>
          <Button onPress={cancel}>cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}