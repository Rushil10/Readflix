import axios from 'axios';
import { LOADING_DATA, SET_BOOK_POSTS, SET_POSTS, SET_SERIES_POSTS } from '../types';
import {api} from '../../api'

export const getSeriesPosts = () => dispatch => {
    dispatch({type:LOADING_DATA})
    axios.get(`${api}/posts`)
    .then(res => {
        dispatch({type:SET_SERIES_POSTS,series:res.data.series})
        //console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })
}

export const getBookPosts = () => dispatch => {
    dispatch({type:LOADING_DATA})
    axios.get(`${api}/posts`)
    .then(res => {
        dispatch({type:SET_BOOK_POSTS,books:res.data.books})
    })
    .catch(err => {
        console.log(err)
    })
}