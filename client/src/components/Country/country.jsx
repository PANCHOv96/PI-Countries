import React from "react";
import { Link } from "react-router-dom";
import style from './country.module.css';

export default function Country({country}){
    return(
        <div className={style.container}>
            <img src={country.image} alt={country.image} className={style.image}/>
            <Link to={`/home/${country.id}`} className={style.info}>
                <div>
                    <h3 className={style.title}>{country.name}</h3>
                    <p>{country.continent}</p>
                </div>
            </Link>
        </div>
    );
}