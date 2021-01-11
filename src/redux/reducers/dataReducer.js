import { LOADING_DATA, POST, SET_BOOK_POSTS, SET_POSTS, SET_SERIES_POSTS } from "../types";

const initialState = {
    series:[],
    books:[],
    post:{},
    loading:false,
}

export default function(state=initialState,action) {
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true,
            }
        case SET_SERIES_POSTS:
            return {
                ...state,
                series:action.series,
                loading:false,
            }
        case SET_BOOK_POSTS:
            return {
                ...state,
                books:action.books,
                loading:false,
            }
        case POST:
            return {
                ...state
            }
        case SET_POSTS:
            return {
                ...state,
                post:action.postInfo,
                loading:false,
            }
        default:
            return state;
    }
}