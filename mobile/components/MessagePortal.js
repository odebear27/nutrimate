import { Dialog, Portal, Text, Button} from "react-native-paper";

export default function MessagePortal({visibility, setNavigation, handlerDialogVisible, data}) {

    const hideDialog = () => {
        handlerDialogVisible(!visibility);
        setNavigation();
    }  

    return (
        <Portal>
            <Dialog visible={visibility} onDismiss={hideDialog}>
                <Dialog.Title>Email sent!</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyLarge">{"A password reset email has been sent to your email registered under your account"}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
      );
}