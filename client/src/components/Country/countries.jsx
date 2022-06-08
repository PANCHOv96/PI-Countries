import React,{useEffect} from "react";
import { useDispatch,useSelector } from  'react-redux';
import { getActivity, getCountryAll } from "../../actions/index.js";
import Country from './country.jsx'
import BtnActivity from '../Activity/BtnActivity.jsx';
import Searchbar from '../Search/Searchbar.jsx';
import Filters from '../Filters/Filters.jsx';
import Pages from '../Pages/Pages.jsx';

export default function Countries(){
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.country);
    const conditions = useSelector((state) => state.conditions);
    useEffect(()=>{
        dispatch(getCountryAll(conditions));
    },[conditions]);
    return(
        <div>
            <BtnActivity />
            <Searchbar />
            {/* <Filters /> */}
            <h2>Countries</h2>
            {countries && countries.map(country =>
                <Country country={country} key={country.id}/>
            )}
            <Pages />
        </div>
    );
}