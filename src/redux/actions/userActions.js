import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {api} from '../../api'
import { CLEAR_ERRORS, SET_AUTHENTICATED, SET_ERRORS, SET_UNAUTHENTICATED,LOADING_UI, LOADING_USER, SET_USER } from '../types';

let token = null;
let username = null;
let password = null;

export const loginUser =  (userData,callback) => (dispatch) => {
    dispatch({type:LOADING_UI});
    axios.post(`${api}/login`,userData)
    .then(res => {
        //console.log(res)
        if(res.data.Token){
            token = res.data.Token;
            username = userData.username,
            password = userData.password,
            setAuthorizationHeader(res.data.Token);
            dispatch(getUserData(userData.username))
            //dispatch({type:SET_AUTHENTICATED,username:userData.username,token:res.data.Token})
            dispatch({type:CLEAR_ERRORS})
            callback();
        } else {
            dispatch({
                type:SET_ERRORS,
                payload:res.data.error
            })
            dispatch({type:SET_UNAUTHENTICATED})
        }
    })
    .catch(err => {
        console.log(err)
    })
}

export const getUserData = (username) => (dispatch) => {
    dispatch({type:LOADING_USER})
    console.log(axios.defaults.headers)
    axios.get(`${api}/user/${username}`)
    .then(res => {
        dispatch({type:SET_USER,user:res.data.user})
    })
    .catch(err => console.log(err))
}

export const signupUser = (userData,callback) => (dispatch) => {
    dispatch({type:LOADING_UI});
    axios.post(`${api}/signup`,userData)
    .then(res => {
        //console.log(res.data)
        if(res.data.Token){
            setAuthorizationHeader(res.data.Token);
            dispatch(getUserData(userData.username))
            //dispatch({type:SET_AUTHENTICATED,username:userData.username,token:res.data.Token})
            dispatch({type:CLEAR_ERRORS})
            callback();
        } else {
            dispatch({
                type:SET_ERRORS,
                payload:'Username Not Available'
            })
            dispatch({type:SET_UNAUTHENTICATED})
        }
    })
    .catch(err => {
        console.log(err)
    })
}

const setToken = async() => {
    await AsyncStorage.setItem('userToken',`Bearer ${token}`)
    await AsyncStorage.setItem('username',username)
    await AsyncStorage.setItem('password',password)
}

const removeToken = async() => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('password')
}
 
const setAuthorizationHeader = (token) => {
    //console.log(token)
    //AsyncStorage.setItem('userToken',`Bearer ${token}`)
    setToken();
    const FBIdToken = `Bearer ${token}`
    //console.log(FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken;
    //console.log(axios.defaults.headers)
}

export const logoutUser = (callback) => (dispatch)  => {
    removeToken()
    delete axios.defaults.headers.common['Authorization']
    dispatch({type:SET_UNAUTHENTICATED})
    callback()
} 