import React , {useState} from "react";
import { useDispatch} from  'react-redux';
import { setName } from "../../actions/index.js";

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
        <div>
            <h2>Searchbar</h2>
            <input type="search" onChange={e => inputSerching(e.target.value)} value={searching}/>
            <button onClick={search}>Search</button>
        </div>
    );
}