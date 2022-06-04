import React from "react";

export default function Country({country}){
    return(
        <div>
            <h5>{country.name}</h5>
            {/* <img src={country.image} alt="" /> */}
            <ul>
                <li>{country.continent}</li>
                <li>{country.capital}</li>
                <li>{country.sub_region}</li>
                <li>{country.area}</li>
                <li>{country.population}</li>
            </ul>
        </div>
    );
}