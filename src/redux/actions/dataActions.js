import axios from 'axios';
import { LOADING_DATA, SET_POSTS } from '../types';
import {api} from '../../api'

export const getPosts = () => dispatch => {
    dispatch({type:LOADING_DATA})
    axios.get(`${api}/posts`)
    .then(res => {
        dispatch({type:SET_POSTS,posts:res.data.series})
        //console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}