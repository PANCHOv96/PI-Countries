import {GET_COUNTRY} from '../actions/index.js'

const initialState={
    country:[],
    cargando: false
}

export default function rootReducer(state=initialState,action){
    switch (action.type) {
        case GET_COUNTRY:
            return{
                ...state,
                country: action.payload
            }
        default:
            return {...state}
    }
}