import React from "react";
import { Link } from "react-router-dom";

export default function Country({country}){
    return(
        <div>
            <h5>{country.name}</h5>
            <div>
                <img src={country.image} alt={country.image} />
                <p>{country.continent}</p>
                <Link to={`/home/${country.id}`}>
                    <button>Info</button>
                </Link>
            </div>
        </div>
    );
}