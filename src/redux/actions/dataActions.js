import axios from 'axios';
import { CLEAR_ERRORS, LOADING_DATA, SET_BOOK_POSTS, SET_POSTS, SET_SERIES_POSTS,LOADING_UI,POST, SET_POST } from '../types';
import {api} from '../../api'

export const getSeriesPosts = () => dispatch => {
    //dispatch({type:LOADING_DATA})
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
    //dispatch({type:LOADING_DATA})
    axios.get(`${api}/posts`)
    .then(res => {
        dispatch({type:SET_BOOK_POSTS,books:res.data.books})
    })
    .catch(err => {
        console.log(err)
    })
}

export const post = (post) => dispatch => {
    //dispatch({type:LOADING_UI})
    console.log(post)
    axios.post(`${api}/post`,post)
    .then(res => {
        //console.log(res.data)
        dispatch({type:POST})
        dispatch({type:CLEAR_ERRORS})
    })
    .catch(err => {
        console.log(err)
    })
}

export const getPost = (id) => dispatch => {
    //dispatch({type:LOADING_DATA})
    axios.get(`${api}/post/${id}`)
    .then(async(res) => {
        //console.log(res.data)
        await dispatch({type:SET_POSTS,postInfo:res.data})
    })
    .catch(err => {
        console.log(err)
    })
}