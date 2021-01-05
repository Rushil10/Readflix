import React,{Component,useEffect} from 'react';
import {View,StyleSheet,KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'
import { Input,Icon,Button,Spinner,Text} from '@ui-kitten/components';
import { TouchableWithoutFeedback } from 'react-native';

function LoginScreen(props) {
    const [username,setUsername] = React.useState('')
    const [password,setPassword] = React.useState('')
    const [errors,setErrors] = React.useState('')
    const {UI:{loading}} = props;

    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
    </TouchableWithoutFeedback>
  );

    const loginHandle = (username,password) => {
        const userData = {
            username,
            password
        }
        props.loginUser(userData,()=>props.navigation.replace('Home'))
    }

    useEffect(() => {
        if(props.UI.errors){
            setErrors(props.UI.errors)
        }
    },[props.UI.errors])

    return (
        <View style={{ flex: 1,justifyContent: 'center',backgroundColor:'black' }}>
        <Text style={styles.logo} category='h1' status='danger'>READFLIX</Text>
        <Input status='control' autoCompleteType='off' style={styles.inputBox} size='large' placeholder='Username' value={username} onChangeText={newValue => setUsername(newValue)} />
        <Input status='control' autoCompleteType='off' style={styles.inputBox} size='large' placeholder='Password' value={password} 
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={pass => setPassword(pass)} />
        <Button status='control' style={styles.button} onPress={() => loginHandle(username,password)}>{loading ? <Spinner size='small'/> : <Text>Log In</Text>}</Button>
        {errors!='' ? <Text style={styles.error}>{errors}</Text> : null}
        <Button onPress={() => props.navigation.replace('SignUp')} style={styles.signup} appearance='ghost'><Text style={styles.text}>Don't have an account? <Text style={styles.textInside}>Sign up</Text></Text></Button>
      </View>
    );
  }

LoginScreen.propTypes = {
    loginUser: PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    UI:state.UI
})

const mapActionsToProps = {
    loginUser
}

const styles = StyleSheet.create({
    logo:{
        fontWeight:'bold',
        fontSize:41,
        marginBottom:25,
        alignItems:'center',
        textAlign:'center',
        color:'#E50914'
    },
    inputBox:{
        marginLeft:31,
        marginRight:31,
        marginTop:5,
        marginBottom:5,
        alignItems:'center'
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
    error:{
        marginTop:5,
        textAlign:'center',
        color:'#E50914'
    },
    signup:{
        position:'absolute',
        bottom:5,
        textAlign:'center',
        alignItems:'center',
        width:'100%',
        justifyContent:'center',
        borderTopColor:'#404040',
    },
    text:{
        color:'gray',
        fontSize:13
    },
    textInside:{
        fontSize:13
    }
})

export default connect(mapStateToProps,mapActionsToProps)(LoginScreen);