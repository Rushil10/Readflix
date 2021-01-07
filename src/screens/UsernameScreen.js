import * as React from 'react';
import { View,StyleSheet,KeyboardAvoidingView, useColorScheme,Alert } from 'react-native';
import { Input,Button,Spinner,Text,Icon} from '@ui-kitten/components';
import {signupUser} from '../redux/actions/userActions'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import store from '../redux/store'
import { CLEAR_ERRORS } from '../redux/types';


const personIcon = (props) => {
    <Icon {...props} name='person-outline' />
}

function UsernameScreen(props) {
    const {UI:{loading}} = props;

    const [username,setUsername] = React.useState('')
    const [errors,setErrors] = React.useState('')

    const scheme = useColorScheme();
    let stat = 'control';
    {scheme === 'dark' ? stat='control' : stat='danger'}

    const {firstname,lastname,email,password,phoneNumber} = props.route.params;

    const signupHandle = (username) => {
        if(username.length < 4 || /\s/.test(username)) {
            Alert.alert('Invalid Input','Username cannot be empty and It should not have space',[{text:'Okay'}]);
            return;
        } else {
            const userData = {
                firstname,
                lastname,
                email,
                password,
                confirmPassword:password,
                contact:phoneNumber,
                username
            }
            props.signupUser(userData,() => props.navigation.replace('Main',{screen:'Series'}))
        }
    }

    React.useEffect(() => {
        if(props.UI.errors){
            setErrors(props.UI.errors)
        }
    },[props.UI.errors])

    const goToLogin = (callback) => {
        store.dispatch({type:CLEAR_ERRORS})
        callback()
      }

    //console.log(props)

    return (
        <View style={{flex:1,marginTop:30,justifyContent:'center'}}>
            <Text style={styles.logo}>Username</Text>
            <Input status={stat} autoCompleteType='off' style={styles.inputBox} size='large' placeholder='Username' value={username} onChangeText={newValue => setUsername(newValue)} />
            <Button status={stat} style={styles.button} onPress={() => signupHandle(username)}>{loading ? <Spinner status='basic' size='small'/> : 'Log In'}</Button>
            {errors!='' ? <Text style={styles.error}>{errors}</Text> : null}
            <Button onPress={() => goToLogin(() => props.navigation.replace('Login'))} style={styles.signup} appearance='ghost'><Text style={styles.text}>Already have an account?</Text><Text style={styles.textInside}> Log in</Text></Button>
        </View>
    )
}

UsernameScreen.propTypes = {
    signupUser: PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user:state.user,
    UI:state.UI
})

const mapActionsToProps = {
    signupUser
}

const styles = StyleSheet.create({
    logo:{
    fontWeight:'bold',
    fontSize:41,
    marginBottom:20,
    alignItems:'center',
    textAlign:'center',
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

export default connect(mapStateToProps,mapActionsToProps)(UsernameScreen);