import {GET_COUNTRY ,GET_COUNTRY_ID,GET_ACTIVITY, SET_NUMBER_PAGE ,SET_NAME ,SET_CONTINENT,SET_POPULATION,SET_ALPHABETICALLY,SET_RESET,SET_ACTIVITY} from '../actions/index.js'

const initialState={
    country:[],
    activity:[],
    pageMax: 0,
    pageActuality: 1,
    cargando: false,
    conditions:{
    }
}

export default function rootReducer(state=initialState,action){
    switch (action.type) {
        case GET_COUNTRY:
            return{
                ...state,
                country: action.payload.rows,
                pageMax: Math.ceil(action.payload.count / 10)
            }
        case GET_COUNTRY_ID:
            return{
                ...state,
                country: action.payload,
            }
        case GET_ACTIVITY:
            return{
                ...state,
                activity: action.payload,
            }
        case SET_NUMBER_PAGE: 
            return{
                ...state,
                pageActuality: action.pageActuality,
                conditions:{
                    ...state.conditions,
                    pagination: action.pageActuality
                }
            }
        case SET_NAME: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{
                    ...state.conditions,
                    name: action.name,
                    pagination: 1
                }
            }
        case SET_CONTINENT: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{
                    ...state.conditions,
                    continents: action.continents,
                    pagination: 1
                }
            }
        case SET_POPULATION: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{
                    ...state.conditions,
                    population: action.populationOrder,
                    alphabetically: '',
                    pagination: 1
                }
            }
        case SET_ALPHABETICALLY: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{
                    ...state.conditions,
                    alphabetically: action.alphabeticallyOrder,
                    population: '',
                    pagination: 1
            }
        }
        case SET_ACTIVITY: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{
                    ...state.conditions,
                    activities: action.activities,
                    pagination: 1
            }
        }
        case SET_RESET: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{}
            }
        default:
            return {...state}
    }
}

