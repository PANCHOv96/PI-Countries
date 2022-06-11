import {GET_COUNTRY ,GET_COUNTRY_ID,GET_ACTIVITY, SET_NUMBER_PAGE ,SET_NAME ,SET_CONTINENT,SET_POPULATION,SET_ALPHABETICALLY,SET_RESET,SET_ACTIVITY,SET_CARGANDO,ERROR,SET_ERROR} from '../actions/index.js'

const initialState={
    country:[],
    activity:[],
    countryID:{},
    pageMax: 0,
    pageActuality: 1,
    cargando: false,
    conditions:{
    },
    error:''
}

export default function rootReducer(state=initialState,action){
    switch (action.type) {
        case GET_COUNTRY:
            return{
                ...state,
                country: action.payload.rows,
                pageMax: Math.ceil(action.payload.count / 10),
                cargando: false,
                error:''
            }
        case SET_CARGANDO:
            return{
                ...state,
                cargando: true,
                error:''
            }
        case GET_COUNTRY_ID:
            return{
                ...state,
                countryID: action.payload,
                error:''
            }
        case GET_ACTIVITY:
            return{
                ...state,
                activity: action.payload,
                error:''
            }
        case SET_NUMBER_PAGE: 
            return{
                ...state,
                pageActuality: action.pageActuality,
                conditions:{
                    ...state.conditions,
                    pagination: action.pageActuality
                },
                error:''
            }
        case SET_NAME: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{
                    ...state.conditions,
                    name: (action.name !== '') ? action.name : '',
                    pagination: 1
                },
                error:''
            }
        case SET_CONTINENT: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{
                    ...state.conditions,
                    continents: action.continents,
                    pagination: 1
                },
                error:''
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
                },
                error:''
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
            },
            error:''
        }
        case SET_ACTIVITY: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{
                    ...state.conditions,
                    activities: action.activities,
                    pagination: 1
            },
            error:''
        }
        case SET_RESET: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{},
                error:''
            }
        case ERROR: 
            return{
                ...state,
                cargando:false,
                error: action.msjError
            }
        case SET_ERROR: 
            return{
                ...state,
                cargando:false,
                error: {message:action.msjError}
            }
        default:
            return {...state}
    }
}

