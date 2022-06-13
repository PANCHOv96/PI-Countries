import React, { useEffect }  from "react";
import { useDispatch , useSelector} from  'react-redux';
import { setContinent , setAlphabeticallyOrder ,setResetFilter, setPopulationOrder,setActivity, getActivity, setAlert} from "../../actions/index.js";
import style from './Filters.module.css';
import resetFilterSvg from './img/reset-filter.svg';

export default function Filters(){
    const dispatch = useDispatch();
    const activity = useSelector((state) => state.activity);
    const conditions = useSelector((state) => state.conditions);
    useEffect(()=>{
        dispatch(getActivity());
    },[dispatch]);
    function ContinentSelected(e){
        dispatch(setContinent(e));
    }
    function ordersSelected(e){
        const order = e.split('-');
        if(order[0] ===  'ALFA'){
            dispatch(setAlphabeticallyOrder(order[1]));
        }else{
            if(order[0] ===  'POP'){
                dispatch(setPopulationOrder(order[1]));
            }else{
                dispatch(setAlert('Error Filters Orders'));
            }
        }
    }
    function ActivitySelected(e){
        dispatch(setActivity(e));
    }
    function printActivitySelect(){
        return (<div>
                    <label htmlFor="activities">Activities</label>
                    <select id="activities" name="activities" onChange={e => ActivitySelected(e.target.value)}  value={conditions.activities ? conditions.activities : ''}>
                        <option value='' disabled selected>Filter by Activities</option>
                        {activity.map(act=>{
                            return <option value={act.name} key={act.id}>{act.name}</option>
                        })}
                    </select>
                </div>);
    }
    return(
        <div className={style.filters}>
            <div>
                <label htmlFor="continents">Continents</label>
                <select id="continents" name="continents" onChange={e => ContinentSelected(e.target.value)} value={conditions.continents ? conditions.continents : ''}>
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
                <label htmlFor="orders">Orders</label>
                <select id="orders" name="orders" onChange={e => ordersSelected(e.target.value)} value={conditions.alphabetically ? `ALFA-${conditions.alphabetically}` : conditions.population ? `POP-${conditions.population}`:''}>
                    <option value='' disabled selected>Filter by Orders</option>
                    <option value='ALFA-ASC'>ALFA ASC</option>
                    <option value='ALFA-DESC'>ALFA DESC</option>
                    <option value='POP-ASC'>POP ASC</option>
                    <option value='POP-DESC'>POP DESC</option>
                </select>
            </div>
            <div>
                <button onClick={()=>{dispatch(setResetFilter())}} className={style.reset}><img src={resetFilterSvg} alt="" /></button>
            </div>
        </div>
    );
}