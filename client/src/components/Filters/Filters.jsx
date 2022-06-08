import React, { useEffect }  from "react";
import { useDispatch , useSelector} from  'react-redux';
import { setContinent , setAlphabeticallyOrder ,setResetFilter, setPopulationOrder,setActivity, getActivity} from "../../actions/index.js";

export default function Filters(){
    const dispatch = useDispatch();
    const activity = useSelector((state) => state.activity);
    useEffect(()=>{
        dispatch(getActivity());
    },[]);
    function ContinentSelected(e){
        dispatch(setContinent(e));
    }
    function ordersSelected(e){
        const order = e.split('-');
        if(order[0] ===  'ALFA'){
            dispatch(setAlphabeticallyOrder(order[1]));
        }else{
            dispatch(setPopulationOrder(order[1]));
        }
    }
    function ActivitySelected(e){
        dispatch(setActivity(e));
    }
    function printActivitySelect(){
        return (<div>
                    <label for="activities">Activities:</label>
                    <select id="activities" name="activities" onChange={e => ActivitySelected(e.target.value)}>
                        <option value='' disabled selected>Filter by Activities</option>
                        {activity.map(act=>{
                            return <option value={act.name} key={act.id}>{act.name}</option>
                        })}
                    </select>
                </div>);
    }
    return(
        <div>
            <h2>Filters</h2>
            <div>
                <label for="continents">Continents:</label>
                <select id="continents" name="continents" onChange={e => ContinentSelected(e.target.value)}>
                    <option value='' disabled selected>Filter by Continent</option>
                    <option value='Americas'>Americas</option>
                    <option value='Europe'>Europe</option>
                    <option value='Africa'>Africa</option>
                    <option value='Asia'>Asia</option>
                    <option value='Oceania'>Oceania</option>
                    <option value='Antarctic'>Antarctic</option>
                </select>
            </div>
            {activity.length > 0 && printActivitySelect()} 
            <div>
                <label for="orders">Orders:</label>
                <select id="orders" name="orders" onChange={e => ordersSelected(e.target.value)}>
                    <option value='' disabled selected>Filter by Orders</option>
                    <option value='ALFA-ASC'>ALFA ASC</option>
                    <option value='ALFA-DESC'>ALFA ASC</option>
                    <option value='POP-ASC'>POP ASC</option>
                    <option value='POP-DESC'>POP ASC</option>
                </select>
            </div>
            <button onClick={()=>{dispatch(setResetFilter())}}>Reset Filters</button>
        </div>
    );
}