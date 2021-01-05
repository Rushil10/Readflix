import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {api} from '../../api'
import { CLEAR_ERRORS, SET_AUTHENTICATED, SET_ERRORS, SET_UNAUTHENTICATED,LOADING_UI } from '../types';

export const loginUser =  (userData,callback) => (dispatch) => {
    dispatch({type:LOADING_UI});
    axios.post(`${api}/login`,userData)
    .then(res => {
        console.log(res)
        if(res.data.Token){
            setAuthorizationHeader(res.data.Token);
            dispatch({type:SET_AUTHENTICATED,username:userData.username,token:res.data.Token})
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
 
const setAuthorizationHeader = async(token) => {
    await AsyncStorage.setItem('userToken',`Bearer ${token}`)
    const FBIdToken = `Bearer ${token}`
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const logoutUser = (callback) => (dispatch)  => {
    AsyncStorage.removeItem('userToken');
    delete axios.defaults.headers.common['Authorization']
    dispatch({type:SET_UNAUTHENTICATED})
    callback()
} 