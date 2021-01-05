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
import HomeScreen from './src/screens/HomeScreen'
import AsyncStorage from '@react-native-community/async-storage';
import * as eva from '@eva-design/eva';
import { ApplicationProvider,IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons'

const Stack = createStackNavigator();

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

  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.dark}>
    <Provider store={store}>
      <NavigationContainer>
      {token!=null ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      )}
    </NavigationContainer>
    </Provider>
    </ApplicationProvider>
    </>
  );
}

export default App