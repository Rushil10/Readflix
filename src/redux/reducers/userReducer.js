import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from "../types";

const initialState = {
    authenticated:false,
    username:null,
    token:null,
    loading:false,
    userDetails:{}
}

export default function(state = initialState,action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated:true,
                username:action.username,
                token:action.token
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
            return {
                ...state,
                authenticated:true,
                username:action.user.username,
                userDetails:action.user
            }
        default:
            return state;
    }
}