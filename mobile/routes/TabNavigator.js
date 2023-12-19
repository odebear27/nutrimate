import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { InitStackNavigator, MainStackNavigator, ProfileStackNavigator, CourseStackNavigator, } from "./StackNavigator";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { AuthContext } from "../contexts/AuthenticateContext";

const Tab = createBottomTabNavigator();
const MaterialTab = createMaterialTopTabNavigator();

const ProfileTabNavigator = () => {

  return (
    <MaterialTab.Navigator
      screenOptions={({ route }) => ({
        // tabBarIcon: ({ focused, color, size }) => {
        //   let iconName;
        //   if (route.name === "Profile Tab") {
        //     iconName = focused ? "home" : "home-outline";

        //     // You can return any component that you like here!
        //     return <Ionicons name={iconName} size={size} color={color} />;
        //   } else if (route.name === "Courses Tab") {
        //     // iconName = "person-fill";
        //     iconName = focused ? "person-circle" : "person-circle-outline";

        //     // You can return any component that you like here!
        //     // return <Octicons name={iconName} size={size} color={color} />;
        //     return <Ionicons name={iconName} size={size} color={color} />;
        //   }
        // },
        tabBarPosition: "bottom",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#777",
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 18, fontWeight: "bold", textAlignVertical: "bottom", flex: 1, flexDirection: "column", justifyContent: "flex-end"},
        tabBarItemStyle: { height: 80 },
        tabBarStyle: { backgroundColor: '#43521A' },
        // headerShown: true,
      })}
    >
      <MaterialTab.Screen name="Profile Tab" component={ProfileStackNavigator} options={{ title: 'Profile' }} />
      <MaterialTab.Screen name="Courses Tab" component={CourseStackNavigator} options={{ title: 'Courses' }}/>
    </MaterialTab.Navigator>
  );

}

const BottomTabNavigator = () => {

  const authContext = React.useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home Tab") {
            iconName = focused ? "home" : "home-outline";

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Customer Tab") {
            iconName = "person-fill";
            // iconName = "person-circle-outline";
            // iconName = focused ? "person-circle" : "person-circle-outline";

            // You can return any component that you like here!
            return <Octicons name={iconName} size={size} color={color} />;
            // return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#43521A",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home Tab" component={MainStackNavigator} />
      <Tab.Screen name="Customer Tab" component={ProfileTabNavigator} />
    </Tab.Navigator>
  );
};

export { ProfileTabNavigator, BottomTabNavigator};