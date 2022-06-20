import {GET_COUNTRY ,GET_COUNTRY_ID,GET_ACTIVITY, SET_NUMBER_PAGE ,SET_NAME ,SET_CONTINENT,SET_POPULATION,SET_ALPHABETICALLY,SET_RESET,SET_ACTIVITY,SET_LOADING, ALERT,SET_ALERT,SET_FILTERS} from '../actions/index.js'

const initialState={
    country:[],
    activity:[],
    countryID:{},
    pageMax: 0,
    pageActuality: 1,
    loading: false,
    conditions:{
    },
    alert:'',
    filters: false
}

export default function rootReducer(state=initialState,action){
    switch (action.type) {
        case GET_COUNTRY:
            return{
                ...state,
                country: action.payload.rows,
                pageMax: Math.ceil(action.payload.count / 10),
                loading: false,
                alert:''
            }
        case GET_COUNTRY_ID:
            return{
                ...state,
                countryID: action.payload,
                alert:''
            }
        case GET_ACTIVITY:
            return{
                ...state,
                activity: action.payload,
                alert:''
            }
        case SET_NUMBER_PAGE: 
            return{
                ...state,
                pageActuality: action.pageActuality,
                conditions:{
                    ...state.conditions,
                    pagination: action.pageActuality
                },
                alert:''
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
                alert:''
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
                alert:'',
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
                alert:''
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
            alert:''
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
            alert:''
        }
        case SET_RESET: 
            return{
                ...state,
                pageActuality: 1,
                conditions:{},
                alert:''
            }
        case SET_LOADING:
            return{
                ...state,
                loading: true,
                alert:'',
            }
        case ALERT: 
            return{
                ...state,
                loading:false,
                alert: action.msjAlert
            }
        case SET_ALERT: 
            return{
                ...state,
                loading:false,
                alert: {message:action.msjAlert}
            }
        case SET_FILTERS: 
            return{
                ...state,
                filters: action.value
            }
        default:
            return {...state}
    }
}

