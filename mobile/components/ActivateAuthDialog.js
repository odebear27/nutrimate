import { Dialog, Portal, Text, Button} from "react-native-paper";
import { AuthContext } from "../contexts/AuthenticateContext";
import { useContext } from "react";
import { SecureStoreContext } from "../contexts/SecureStoreContext";

export default function ActivteAuthDialog({ visibility, handlerDialogVisible, }) {
  const authContext = useContext(AuthContext);
  const secureStoreContext = useContext(SecureStoreContext);

  const activateBiometric = async () => {
    handlerDialogVisible(!visibility);
    const promise = await processBiometric();
    authContext.setComponentDisabled(false);
    authContext.setInProgress(false);
    authContext.setLoginStatus(true);
  };

  const processBiometric = () => {
    return new Promise((reject) => {
      secureStoreContext
        .saveCredentials("username", authContext.credentials.username)
        .then((message) => {
          reject(message);
        });
    });
  };

  const cancel = () => {
    handlerDialogVisible(!visibility);
    authContext.setComponentDisabled(false);
    authContext.setInProgress(false);
    authContext.setLoginStatus(true);
  };

  return (
    <Portal>
      <Dialog visible={visibility} onDismiss={cancel}>
        <Dialog.Title>Activate Biometric</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyLarge">
            {
              "Would you like to enable biometric authentication for the next time?"
            }
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={activateBiometric}>Yes, please</Button>
          <Button onPress={cancel}>cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}