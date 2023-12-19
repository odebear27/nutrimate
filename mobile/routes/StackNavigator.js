import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Recipes from "../screens/Recipes";
import Profile from "../screens/Profile";
import Course from "../screens/Course";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Initial from "../screens/Initial";
import Reset from "../screens/Reset";
import RecipesUpload from "../screens/RecipesUpload";
import RecipeList from "../screens/RecipeList";
import RecipeDetails from "../screens/RecipeDetails";
import CourseList from "../screens/CourseList";
import RecipeReview from "../screens/RecipeReview";
import CourseDetails from "../screens/CourseDetails";
import JapaneseCourse from "../screens/JapaneseCourse";
import CourseRegister from "../screens/CourseRegister";
import RegisteredCourse from "../screens/RegisteredCourse";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};
  
  const MainStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#43521A',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Recipes" component={Recipes} />
        <Stack.Screen name="Courses" component={Course} />
        <Stack.Screen name="RecipesUpload" component={RecipesUpload} />
        <Stack.Screen 
          name="RecipeList" 
          component={RecipeList} 
          options={({ route }) => ({ title: route.params.cuisine })}
        />
        <Stack.Screen 
          name="RecipeDetails" 
          component={RecipeDetails} 
          options={({ route }) => ({ title: route.params.cuisine })}
        />
        <Stack.Screen name="CourseList" component={CourseList} />
        <Stack.Screen name="RecipeReview" component={RecipeReview} />
        <Stack.Screen name="CourseDetails" component={CourseDetails} />
        {/* <Stack.Screen name="Japanese-Courses" component={JapaneseCourse} /> */}
        {/* <Stack.Screen name="CourseRegister" component={CourseRegister} /> */}
      </Stack.Navigator>
    );
  }

  const InitStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#43521A',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Initial" component={Initial} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Reset" component={Reset} />
      </Stack.Navigator>
    );
  }
  
  const ProfileStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{
        // headerStyle: {
        //   backgroundColor: '#43521A',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },
        headerShown: false,
      }}>
        <Stack.Screen name="Profile" component={Profile} initialParams={{ role: null }} options={{ title: 'Personal Details' }}/>
      </Stack.Navigator>
    );
  }

  const CourseStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{
        // headerStyle: {
        //   backgroundColor: '#43521A',
        // },
        // headerTintColor: '#fff',
        // headerTitleStyle: {
        //   fontWeight: 'bold',
        // },        
        headerShown: false,
      }}>
        <Stack.Screen name="Courses" component={RegisteredCourse} options={{ title: 'Registered Courses' }} initialParams={{reload: true}} />
      </Stack.Navigator>
    );
  } 
  
  export { MainStackNavigator, ProfileStackNavigator, InitStackNavigator, CourseStackNavigator };