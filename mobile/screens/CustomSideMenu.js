import React, { useContext } from "react";
import { SafeAreaView, View, StyleSheet, Text, } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { Avatar } from 'react-native-paper';
import { ProfileContext } from '../contexts/ProfileContext';
import { AuthContext } from "../contexts/AuthenticateContext";

function CustomSideMenu(props) {
  const authContext = useContext(AuthContext);
  const profileContext = useContext(ProfileContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {authContext.isLoggedIn && (
        <View style={styles.center}>
          <Avatar.Text size={100} label={profileContext.profile.initial} style={{backgroundColor: "#43521A"}}/>
          <Text
            style={styles.avatarText}
          >{`Welcome\n${profileContext.profile.firstname}, ${profileContext.profile.lastname}`}</Text>
        </View>
      )}

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text style={{ fontSize: 12, textAlign: "center", color: "lightgrey" }}>
        Nutrimate and Special Food
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  avatarText: {
    marginTop: 30,
    fontSize: 14,
    textAlign: "center",
    color: "grey",
    marginBottom: 0,
  },
});

export default CustomSideMenu;