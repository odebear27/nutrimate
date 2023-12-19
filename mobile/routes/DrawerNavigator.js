import React, { useContext } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { ContactStackNavigator, InitStackNavigator } from "./StackNavigator";
import { CustomerStackNavigator, BottomTabNavigator } from "./TabNavigator";
import Avatar from "../screens/Avatar";

import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Logout from "../screens/Logout";
import { AuthContext } from "../contexts/AuthenticateContext";
import Login from "../screens/Login";
import CustomSideMenu from "../screens/CustomSideMenu";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  const authContext = useContext(AuthContext);

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Avatar") {
            iconName = focused ? "person-circle" : "person-circle-outline";

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Logout") {
            iconName = "logout";

            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        },        
        drawerActiveTintColor: "#43521A",
        drawerInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
      })}
      drawerContent={props => <CustomSideMenu {...props} />}
    >
      {authContext.isLoggedIn ? (
        <Drawer.Group>
          <Drawer.Screen name="Home" component={BottomTabNavigator} />
          {/* <Drawer.Screen name="Avatar" component={Avatar} /> */}
          <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Group>
      ) : (
        <Drawer.Screen name="Home" component={InitStackNavigator} />
      )}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;