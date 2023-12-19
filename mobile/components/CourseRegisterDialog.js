import { Dialog, Portal, Text, Button} from "react-native-paper";
import { AuthContext } from "../contexts/AuthenticateContext";
import { useContext } from "react";
import { SecureStoreContext } from "../contexts/SecureStoreContext";

export default function CourseRegisterDialog({ visibility, promptMessage, isError, handlerRegister, handlerDialogVisible }) {

  const titleStatus = isError ? "[Error]:" : "[Confirmation]:";
  const message = isError ? promptMessage : `\n${promptMessage}\n\nOur Administrator will get in touch with you soon on your registration.`

  const handleNavigation = () => {
    handlerDialogVisible(!visibility);
    handlerRegister();
  };

  return (
    <Portal>
      <Dialog visible={visibility} onDismiss={handleNavigation}>
        <Dialog.Title>{`${titleStatus}\nCourse Registration`}</Dialog.Title>
        <Dialog.Content>
          <Text variant="titleMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleNavigation}>ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}