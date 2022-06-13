import React , {useState} from "react";
import { useDispatch} from  'react-redux';
import { setName } from "../../actions/index.js";
import style from './Searchbar.module.css';
import magnifyingGlass from './img/magnifying-glass.svg';

export default function Searchbar(){
    const dispatch = useDispatch();
    let [searching,setSearching] = useState('');
    function search(){
        dispatch(setName(searching))
    }
    function inputSerching(search){
        setSearching(
            search
        );
    }
    return(
        <div className={style.search}>
            <input type="search" onChange={e => inputSerching(e.target.value)} value={searching}/>
            <button onClick={search}><img src={magnifyingGlass} className={style.image}/></button>
        </div>
    );
}