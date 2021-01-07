import React,{Component,useEffect} from 'react';
import { View,Text } from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'
import store from '../redux/store';
import { CLEAR_ERRORS } from '../redux/types';
import AsyncStorage from '@react-native-community/async-storage';

function LoadingScreen(props) {
    const [token,setToken] = React.useState(null)

    const loginHandle = (username,password) => {
        const userData = {
            username,
            password
        }
        props.loginUser(userData,()=>props.navigation.replace('Main',{screen:'Series'}))
    }

    let userna,passwo;

    const getDetails = async() => {
        userna = await AsyncStorage.getItem('username')
        passwo = await AsyncStorage.getItem('password')
        loginHandle(userna,passwo);
    }

    const getToken = async() => {
        let toke;
        console.log('getting Token')
        toke = await AsyncStorage.getItem('userToken')
        setToken(toke)
    }

    const goToLogin = () => {
        props.navigation.replace('Login')
    }

    useEffect(() => {
        console.log(props)
        getToken();
        console.log(token)
        if(token!=null){
            getDetails();
        } else {
            goToLogin();
        }
    },[token])

    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text>ReadFlix</Text>
        </View>
    )
}

LoadingScreen.propTypes = {
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

export default connect(mapStateToProps,mapActionsToProps)(LoadingScreen);