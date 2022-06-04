const ApiKey = 'http://localhost:3001/countries';
export const GET_COUNTRY = 'GET_CHARACTERS';
const axios = require('axios');

export function getCharactersAll(){
    return function(dispatch){
        return axios.get(ApiKey)
            .then(datos => dispatch({
                
                    type: GET_COUNTRY,
                    payload: datos.data
                })
            )
    }
}

