import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

const initialState = {
    authenticated:false,
    username:null,
    token:null,
    loading:false
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
        default:
            return state;
    }
}