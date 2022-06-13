const ApiKey = 'http://localhost:3001/countries';
const ApiKeyActity = 'http://localhost:3001/activity';
export const GET_COUNTRY = 'GET_COUNTRY';
export const GET_COUNTRY_ID = 'GET_COUNTRY_ID';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const SET_NUMBER_PAGE = 'SET_NUMBER_PAGE';
export const SET_NAME = 'SET_NAME';
export const SET_CONTINENT = 'SET_CONTINENT';
export const SET_POPULATION = 'SET_POPULATION';
export const SET_ALPHABETICALLY = 'SET_ALPHABETICALLY';
export const SET_RESET = 'SET_RESET';
export const SET_ACTIVITY = 'SET_ACTIVITY';
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
export const SET_LOADING = 'SET_LOADING';
export const ALERT = 'ALERT';
export const SET_ALERT = 'SET_ALERT';
const axios = require('axios');

export function getCountryAll(conditions){
    return function(dispatch){
        dispatch(loading())
        return axios.get(ApiKey,{params:conditions})
            .then(datos => dispatch({                  
                    type: GET_COUNTRY,
                    payload: datos.data
                })
            )
            .catch(e => dispatch({                  
                type: ALERT,
                msjAlert: e.response.data
            }))
    }
}

export function getCountryID(id){
    return function(dispatch){
        return axios.get(`${ApiKey}/${id}`)
            .then(datos => dispatch({                  
                    type: GET_COUNTRY_ID,
                    payload: datos.data
                })
            )
            .catch(e => dispatch({                  
                type: ALERT,
                msjAlert: e.response.data
            }))
    }
}

export function getActivity(){
    return function(dispatch){
        return axios.get(ApiKeyActity)
            .then(datos => dispatch({                  
                    type: GET_ACTIVITY,
                    payload: datos.data
                })
            )
            .catch(e => dispatch({                  
                type: ALERT,
                msjAlert: e.response.data
            }))
    }
}

export function setNumberPage(num){
    return {
        type: SET_NUMBER_PAGE,
        pageActuality: num
    }
}

export function setName(name){
    return {
        type: SET_NAME,
        name: name,
    }
}

export function setContinent(continents){
    return {
        type: SET_CONTINENT,
        continents: continents
    }
}

export function setPopulationOrder(order){
    return {
        type: SET_POPULATION,
        populationOrder: order
    }
}

export function setAlphabeticallyOrder(order){
    return {
        type: SET_ALPHABETICALLY,
        alphabeticallyOrder: order
    }
}

export function setActivity(activity){
    return {
        type: SET_ACTIVITY,
        activities: activity
    }
}

export function setResetFilter(){
    return {
        type: SET_RESET
    }
}

export function createActivity(data){
    return function(dispatch){
        return axios.post(ApiKeyActity,data)
            .then(datos => dispatch({                  
                    type: CREATE_ACTIVITY,
                })
            )
            .catch(e => dispatch({                  
                type: ALERT,
                msjAlert: e.response.data
            }))
    }
}

export function loading(){
    return {
        type: SET_LOADING,
    }
}

export function setAlert(msjAlert=''){
    return {
        type: SET_ALERT,
        msjAlert
    }
}



