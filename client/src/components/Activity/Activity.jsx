import React ,{ useEffect } from "react";
import { useDispatch ,useSelector} from  'react-redux';
import { createActivity, getActivity } from "../../actions/index.js";

export default function Activity(){
    const dispatch = useDispatch();
    function submitFormActivity(e){
        e.preventDefault();
        const data ={
            name: "Fubol",
            difficulty: "3",
            duration: "90",
            season: "Summer",
            idPais: ["ARG","CHL","BOL"]
        }
        // const {name,difficulty,duration,season,idpais} = e.target
        // console.log(name.value)
        dispatch(createActivity(data));
    }
    return(
        <div>
            <form action="createActivity" onSubmit={e => submitFormActivity(e)}>
                <label htmlFor="">Name</label>
                <input type="text"/>
                <label htmlFor="difficulty">Difficulty</label>
                <input type="number" id='difficulty' name='difficulty' />
                <label htmlFor="duration">Duration</label>
                <input type="number" id='duration' name='duration' />
                <label htmlFor="season">Season</label>
                <input type="text" id='season' name='season'/>
                <label htmlFor="idPais">IdPais</label>
                <input type="text" id='idPais' name='idPais'/>
                <button>Create</button>
            </form>
        </div>
    );
}