import React ,{useEffect } from "react";
import { useDispatch ,useSelector} from  'react-redux';
import { getCountryID } from "../../actions/index.js";
import BtnActivity from '../Activity/BtnActivity.jsx';
import { useParams } from "react-router-dom";

export default function CountryID(){
    const { idPais } = useParams();
    const dispatch = useDispatch();
    const countryID = useSelector((state) => state.countryID);
    useEffect(()=>{
        dispatch(getCountryID(idPais));
    },[dispatch,idPais]);
    return(
        <div>
            <h2>Country ID</h2>
            <BtnActivity />
            <h2>{countryID.name}</h2>
            <img src={countryID.image} alt={countryID.image} />
            <p>{countryID.id}</p>
            <p>{countryID.capital}</p>
            <p>{countryID.sub_region}</p>
            <p>{countryID.area}</p>
            <p>{countryID.population}</p>
            <h3>Activities</h3>
            {countryID.Activities && countryID.Activities.map(activity => {
                return (<div>
                            <h3>{activity.name}</h3>
                            <div>
                                <p>{activity.difficulty}</p>
                                <p>{activity.duration}</p>
                                <p>{activity.season}</p>
                            </div>
                        </div>)
            })}
        </div>
    );
}