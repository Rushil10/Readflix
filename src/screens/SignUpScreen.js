import * as React from 'react';
import { View, Text, Button } from 'react-native';

function SignUpScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>SignUp Screen</Text>
        <Button title='Login Page' onPress={() => navigation.replace('Login')} />
      </View>
    );
  }

export default SignUpScreen;