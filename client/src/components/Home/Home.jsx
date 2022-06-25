import React from "react";
import Countries from '../Country/countries.jsx'
import Filters from '../Filters/Filters.jsx';
import Pages from '../Pages/Pages.jsx';


export default function Home(){
    return(
        <div>
            <Filters />
            <Pages />
            <Countries /> 
        </div>
    );
}