import React,{useEffect} from "react";
import { useDispatch,useSelector } from  'react-redux';
import { getCountryAll } from "../../actions/index.js";
import Country from './country.jsx'


export default function Countries(){
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.country);
    const conditions = useSelector((state) => state.conditions);
    const cargando = useSelector((state) => state.cargando);
    // const error = useSelector((state) => state.error);
    useEffect(()=>{
        dispatch(getCountryAll(conditions));
    },[dispatch,conditions]);
    return(
        <div>
            <h2>Countries</h2>
            {cargando ? 'Cargando...' : ''}
            {countries && countries.map(country =>
                <Country country={country} key={country.id}/>
                )}
        </div>
    );
}