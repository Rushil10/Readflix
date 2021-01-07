// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {connect, Provider} from 'react-redux'
import PropTypes from 'prop-types';
import store from './src/redux/store'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import UsernameScreen from './src/screens/UsernameScreen'
import SeriesScreen from './src/screens/SeriesScreen'
import AsyncStorage from '@react-native-community/async-storage';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {DefaultTheme,DarkTheme} from '@react-navigation/native'
import LoadingScreen from './src/screens/LoadingScreen';
import BooksScreen from './src/screens/BooksScreen';
import CreatePostScreen from './src/screens/CreatePostScreen';
import SearchUserScreen from './src/screens/SearchUserScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

const SignUpStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Series';

  switch (routeName) {
    case 'Series':
      return 'ReadFlix/Series';
    case 'Books':
      return 'ReadFlix/Books';
    case 'CreatePost':
      return 'CreatePost';
    case 'SearchUser':
      return 'Search';
    case 'Profile':
      return 'Profile'
  }
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{title:'Series'}} name="Series" component={SeriesScreen} />
      <Tab.Screen name="Books" component={BooksScreen} />
      <Tab.Screen name="CreatePost" component={CreatePostScreen} />
      <Tab.Screen name="SearchUser" component={SearchUserScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

function SignUp() {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen options={{headerShown: false}} name="SignUpScreen" component={SignUpScreen} />
      <SignUpStack.Screen options={{headerShown: false}} name="Username" component={UsernameScreen} />
    </SignUpStack.Navigator>
  )
}

function App() {

  let scheme = useColorScheme();

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    {
      scheme === 'dark' ? (
        <ApplicationProvider {...eva} theme={eva.dark}>
    <AppearanceProvider>
    <Provider store={store}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Loading" component={LoadingScreen} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
        <Stack.Screen options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            })} name="Main" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </AppearanceProvider>
    </ApplicationProvider>
      ) : (
        <ApplicationProvider {...eva} theme={eva.light}>
    <AppearanceProvider>
    <Provider store={store}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Loading" component={LoadingScreen} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
        <Stack.Screen options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
            })} name="Main" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
    </AppearanceProvider>
    </ApplicationProvider>
      )
    }
    </>
  );
}

export default App