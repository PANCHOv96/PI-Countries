import React from "react";
import { Link } from "react-router-dom";
import style from './country.module.css';

export default function Country({country}){
    return(
        <div className={style.container}>
            <h3 className={style.title}>{country.name}</h3>
            <div>
                <img src={country.image} alt={country.image} className={style.image}/>
                <p>{country.continent}</p>
                <div>
                    <Link to={`/home/${country.id}`}>
                        <button className={style.btn}>Info</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}