import React from "react";
import Countries from '../Country/countries.jsx'
import BtnActivity from '../Activity/BtnActivity.jsx';
import Searchbar from '../Search/Searchbar.jsx';
import Filters from '../Filters/Filters.jsx';
import Pages from '../Pages/Pages.jsx';


export default function Home(){
    return(
        <div>
            <Filters />
            <Countries />
            <Pages />
        </div>
    );
}