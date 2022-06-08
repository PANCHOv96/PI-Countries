import React ,{useEffect } from "react";
import { useDispatch ,useSelector} from  'react-redux';
import { getCountryID } from "../../actions/index.js";
import BtnActivity from '../Activity/BtnActivity.jsx';

export default function CountryID(id){
    const dispatch = useDispatch();
    const country = useSelector((state) => state.country);
    useEffect(()=>{
        dispatch(getCountryID("ARG"));
    },[]);
    return(
        <div>
            <h2>Country ID</h2>
            <BtnActivity />
            <h2>{country.name}</h2>
            <p>{country.id}</p>
            <p>{country.capital}</p>
            <p>{country.sub_region}</p>
            <p>{country.area}</p>
            <p>{country.population}</p>
            <h3>Activities</h3>
            {country.Activities && country.Activities.map(activity => <p>{activity.name}</p>)}
        </div>
    );
}