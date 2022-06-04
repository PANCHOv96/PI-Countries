import React,{useEffect} from "react";
import { useDispatch,useSelector } from  'react-redux';
import { getCharactersAll } from "../../actions/index.js";
import Country from './country.jsx'

export default function Countries(){
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.country);
    useEffect(()=>{
        dispatch(getCharactersAll());
    },[]);
    return(
        <div>
            <h2>Countries</h2>
            {countries && countries.map(country =>
                <Country country={country} key={country.id}/>
            )}
        </div>
    );
}