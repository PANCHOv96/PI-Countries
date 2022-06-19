import React ,{useEffect } from "react";
import { useDispatch ,useSelector} from  'react-redux';
import { getCountryID } from "../../actions/index.js";
import { useParams } from "react-router-dom";
import style from './CountryID.module.css';
import imageDifficulty from './img/difficulty.png';
import imageDuration from './img/duration.png';
import imageSeason from './img/season.png';
import BtnActivity from '../Activity/BtnActivity.jsx';

export default function CountryID(){
    const { idPais } = useParams();
    const dispatch = useDispatch();
    const countryID = useSelector((state) => state.countryID);
    useEffect(()=>{
        dispatch(getCountryID(idPais));
    },[dispatch,idPais]);
    function getActivity(){
        return countryID.Activities.map(activity => {
            return (<div>
                        <fieldset>
                            <legend>{activity.name}</legend>
                            <div className={style.activity}>
                                <div>
                                <img src={imageDifficulty} alt="Difficulty" />
                                    <p>{activity.difficulty}</p>
                                </div>
                                <div>
                                    <img src={imageDuration} alt="Duration" />
                                    <p>{activity.duration} Minutes</p>
                                </div>
                                <div>
                                    <img src={imageSeason} alt="Season" />
                                    <p>{activity.season}</p>
                                </div>
                            </div>
                        </fieldset>
                    </div>)
        })
    }
    return(
        <div className={style.container}>
            <h2 className={style.title}>{countryID.name}</h2>
            <div className={style.containerCountryData}>
                <div className={style.image}>
                    <img src={countryID.image} alt={countryID.image} />
                </div>
                <div className={style.data}>
                    <p>Country Code: <span>{countryID.id}</span></p>
                    <p>Continent: <span>{countryID.continent}</span></p>
                    <p>Capital: <span>{countryID.capital}</span></p>
                    <p>Subregion: <span>{countryID.sub_region}</span></p>
                    <p>Area: <span>{countryID.area} Km2</span></p>
                    <p>Population: <span>{countryID.population} Hab.</span></p>
                </div>
            </div>
            <h3 className={style.titleActivity}>Activities</h3>
            {countryID.Activities ? getActivity() : <p>Not Activity</p>}
            <BtnActivity/>
        </div>
    );
}