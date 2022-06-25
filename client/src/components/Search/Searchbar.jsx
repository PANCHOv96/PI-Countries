import React , {useState} from "react";
import { useDispatch} from  'react-redux';
import { setName } from "../../actions/index.js";
import style from './Searchbar.module.css';

export default function Searchbar(){
    const dispatch = useDispatch();
    let [searching,setSearching] = useState('');
    function search(search){
        setSearching(search)
        if(search.length > 2 || search.length === 0){
            dispatch(setName(search))
        }
    }
    return(
        <div className={style.search}>
            <input type="search" onChange={e => search(e.target.value)} value={searching} placeholder='Search...'/>
        </div>
    );
}