// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {connect, Provider} from 'react-redux'
import PropTypes from 'prop-types';
import store from './src/redux/store'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import UsernameScreen from './src/screens/UsernameScreen'
import HomeScreen from './src/screens/HomeScreen'
import AsyncStorage from '@react-native-community/async-storage';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {DefaultTheme,DarkTheme} from '@react-navigation/native'

const Stack = createStackNavigator();

const SignUpStack = createStackNavigator();

function SignUp() {
  return (
    <SignUpStack.Navigator>
      <SignUpStack.Screen options={{headerShown: false}} name="SignUpScreen" component={SignUpScreen} />
      <SignUpStack.Screen options={{headerShown: false}} name="Username" component={UsernameScreen} />
    </SignUpStack.Navigator>
  )
}

function App() {

  const [token,setToken] = React.useState(null)

  const fetchToken = async() => {
    let userToken = null ;
    try{
      userToken = await AsyncStorage.getItem('userToken')
      setToken(userToken)
    } catch(e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    fetchToken();
  },[])

  const scheme = useColorScheme();

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva[scheme]}>
    <AppearanceProvider>
    <Provider store={store}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {token!=null ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUp} />
        {//<Stack.Screen options={{headerShown: false}} name="Username" component={UsernameScreen} />
        }
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      )}
    </NavigationContainer>
    </Provider>
    </AppearanceProvider>
    </ApplicationProvider>
    </>
  );
}

export default App