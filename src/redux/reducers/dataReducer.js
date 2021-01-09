import { LOADING_DATA, SET_BOOK_POSTS, SET_POSTS, SET_SERIES_POSTS } from "../types";

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
        default:
            return state;
    }
}