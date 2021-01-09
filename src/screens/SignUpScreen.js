import * as React from 'react';
import { View,StyleSheet,KeyboardAvoidingView, Alert, useColorScheme } from 'react-native';
import { Input,Button,Spinner,Text,Icon} from '@ui-kitten/components';
import { TouchableWithoutFeedback } from 'react-native';
import store from '../redux/store'
import { CLEAR_ERRORS } from '../redux/types';

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline'/>
);

function SignUpScreen(props) {
  const [firstname,setFirstname] = React.useState('')
  const [lastname,setLastname] = React.useState('')
  const [email,setEmail] = React.useState('')
  const [password,setPassword] = React.useState('')
  const [phoneNumber,setPhoneNumber] = React.useState('')

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const goToUsername = (firstname,lastname,email,password,phoneNumber) => {
    props.navigation.navigate('SignUp',{screen:'Username',params:{firstname,lastname,email,password,phoneNumber}})
  }

  const loginHandle = (firstname,lastname,email,password,phoneNumber) => {
    const RegEx = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    if(firstname.length == 0 || /\s/.test(firstname)){
      Alert.alert('Invalid Input','Firstname cannot be empty and It should not have space',[{text:'Okay'}]);
      return;
    } else if (lastname.length == 0 || /\s/.test(lastname) ){
      Alert.alert('Invalid Input','Lastname cannot be empty and It should not have space',[{text:'Okay'}]);
      return;
    } else if ( email.length == 0 || /\s/.test(email)) {
      Alert.alert('Invalid Input','Email cannot be empty and It should not have space',[{text:'Okay'}]);
      return;
    } else if ( password.length == 0 || /\s/.test(password)) {
      Alert.alert('Invalid Input','Password cannot be empty and It should not have space',[{text:'Okay'}]);
      return;
    } else if (password.length < 8 ){
      Alert.alert('Invalid Input','Password must contain atleast 8 characters',[{text:'Okay'}]);
      return;
    } else if(phoneNumber.length > 10 || /\s/.test(phoneNumber)) {
      Alert.alert('Invalid Input','Number should contain only 10 digits and It should not have space',[{text:'Okay'}]);
      return;
    } else if( !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      Alert.alert('Invalid Input','Email must be valid email address',[{text:'Okay'}]);
      return;
    } else {
      goToUsername(firstname,lastname,email,password,phoneNumber);
    }
  }

  const goToLogin = (callback) => {
    store.dispatch({type:CLEAR_ERRORS})
    callback()
  }

  const scheme = useColorScheme();
    let stat = 'control';
    {scheme === 'dark' ? stat='control' : stat='danger'}

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );
    return (
      <View style={{ flex: 1}}>
        <Text style={styles.logo}>Signup</Text>
        <View style={styles.naming}>
          <View style={{flex:3}}>
            <Input size='large' style={styles.firstname} status={stat} placeholder='Firstname' value={firstname} onChangeText={newValue => setFirstname(newValue)} />
          </View>
          <View style={{flex:3}}>
          <Input size='large' style={styles.lastname} status={stat} placeholder='Lastname' value={lastname} onChangeText={newValue => setLastname(newValue)} />
          </View>
        </View>
        <Input size='large' style={styles.inputBox} status={stat} placeholder='Email' value={email} onChangeText={newValue => setEmail(newValue)} />
        <Input size='large' style={styles.inputBox} status={stat} autoCompleteType='off' placeholder='Password' value={password} 
        accessoryRight={renderIcon}
        captionIcon={AlertIcon}
        caption='Should contain at least 8 symbols'
        secureTextEntry={secureTextEntry}
        onChangeText={pass => setPassword(pass)} />
        <Input size='large' style={styles.inputBox} status={stat} placeholder='PhoneNumber(Optional)' value={phoneNumber} onChangeText={newValue => setPhoneNumber(newValue)}
        keyboardType={'numeric'}/>
        <Button status={stat} style={styles.button} onPress={() => loginHandle(firstname,lastname,email,password,phoneNumber)} >Next</Button>
        <Button onPress={() => goToLogin(() => props.navigation.replace('Login'))} style={styles.signup} appearance='ghost'><Text style={styles.text}>Already have an account?</Text><Text style={styles.textInside}> Log in</Text></Button>
      </View>
    );
  }

const styles = StyleSheet.create({
  logo:{
    fontWeight:'bold',
    fontSize:41,
    marginBottom:20,
    alignItems:'center',
    textAlign:'center',
    color:'#E50914',
    marginTop:30
},
  constainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  naming:{
    marginTop:5,
    marginBottom:5,
    flexDirection:'row'
  },
  firstname:{
    marginLeft:31,
    marginRight:5,
    //marginTop:3,
    //marginBottom:3,
  },
  lastname:{
    marginRight:31,
    marginLeft:5,
    //marginTop:3,
    //marginBottom:3,
  },
  email:{
    marginRight:25,
    marginLeft:25,
    marginTop:10,
    marginBottom:10
  },
  inputBox:{
    marginLeft:31,
    marginRight:31,
    marginTop:5,
    marginBottom:5,
    alignItems:'center'
},
signup:{
  position:'absolute',
  bottom:3,
  alignItems:'center',
  width:'100%',
  justifyContent:'center',
  borderTopColor:'#404040',
},
text:{
  color:'gray',
  fontSize:11
},
textInside:{
  fontSize:11
},
button:{
  marginLeft:31,
  marginRight:31,
  marginTop:5,
  marginBottom:5,
  flexDirection:'column',
  backgroundColor:'#E50914',
  borderWidth:0
},
})

export default SignUpScreen;