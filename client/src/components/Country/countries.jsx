import React,{useEffect} from "react";
import { useDispatch,useSelector } from  'react-redux';
import { getCountryAll } from "../../actions/index.js";
import Country from './country.jsx'
import style from './countries.module.css';

export default function Countries(){
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.country);
    const conditions = useSelector((state) => state.conditions);
    const loading = useSelector((state) => state.loading);
    useEffect(()=>{
        dispatch(getCountryAll(conditions));
    },[dispatch,conditions]);
    return(
        <div className={style.maxWitdh}>
            <h2 className={style.title}>COUNTRIES</h2>
            {loading ? 'loading...' : ''}
            <div className={style.containerCountries}>
                {countries && countries.map(country =>
                    <Country country={country} key={country.id}/>
                    )}
            </div>
        </div>
    );
}