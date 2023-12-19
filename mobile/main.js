import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from './routes/Login';
// import Profile from './routes/Profile';
import DrawerNavigator from './routes/DrawerNavigator';

export default function Main() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Login" component={ Login } />
    //     <Stack.Screen name="Profile" component={ Profile } />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );

}