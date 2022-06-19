import React ,{ useEffect ,useState} from "react";
import { useDispatch ,useSelector} from  'react-redux';
import { createActivity, getCountryAll ,setAlert} from "../../actions/index.js";
import style from './Activity.module.css'

const NAME = 'name';
const DIFFICULTY = 'difficulty';
const DURATION = 'duration';
const SEASON = 'season';
const IDPAIS = 'idPais';
const SUMMER = 'Summer';
const AUTUMN = 'Autumn';
const WINTER = 'Winter';
const SPRING = 'Spring';

export default function Activity(){
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.country);
    const activity = useSelector((state) => state.activity);
    const [newActivity,setNewActivity] = useState(createObject());
    const [errors,setErrors] = useState(createObject('Error'));
    useEffect(()=>{
        dispatch(getCountryAll({country:true}));
    },[dispatch]);
    function createObject(value=''){
       return{
            [NAME]: value,
            [DIFFICULTY]: value,
            [DURATION]: value,
            [SEASON]: value,
            [IDPAIS]: value === '' ? [] : value
        };
    }
    function handleOnChange(e){
        if(e.name === IDPAIS){
            if(!newActivity.idPais.find(id => id.toUpperCase() === e.value.toUpperCase())){
                setNewActivity({...newActivity,[e.name]: [...newActivity.idPais,e.value]});
            }
        }else{
            setNewActivity({...newActivity,[e.name]: e.value});
        }
        validate(e);
    }
    function validate(e){
        const data = e.value;
        let msjError = '';
        switch (e.name){
            case NAME:
                if (!data) msjError = 'Dato Necesario';
                if(!/^[a-zA-Z ]*$/.test(data)) msjError = 'Solo Letras';
                if(activity.find(element => element.name.toUpperCase() === data.toUpperCase())) msjError= "Nombre no Disponible";
                break;
            case DIFFICULTY:
                if (data < 0 || data > 5 || data === '') msjError = 'Nivel Invalido';
                break;
            case DURATION:
                if (isNaN(data) || (data - Math.floor(data) !== 0 || data === '') || parseInt(data) < 0) msjError = 'Solo Numeros Enteros y positivos';
                break;
            case SEASON:
                const season = [SUMMER,AUTUMN,WINTER,SPRING]
                if (!season.find(element => element === data)) msjError = 'Temporada Incorrecta';
                break;
            case IDPAIS:
                if(newActivity.idPais.find(id => id.toUpperCase() === data.toUpperCase())) msjError= "Paises duplicados"; 
                if (!/^[a-zA-Z ]*$/.test(data) || data.length !== 3) msjError = 'Id de pais invalido';
                break;
            default:
                return;
        }
        setErrors({...errors,[e.name]: msjError});
    }
    function RemoveId(e){
        let res = newActivity.idPais.filter( id => id !== e.id);
        setNewActivity({...newActivity,idPais: res});
        if(res.length === 0) setErrors({...errors,idPais:'Error'});
    }
    function statusButton(){
        if(newActivity.name !== '' || newActivity.difficulty !== '' || newActivity.duration !== '' || newActivity.season !== '' || newActivity.idPais.length !== 0 ){
            if(errors.name === '' && errors.difficulty === '' && errors.duration === '' && errors.season === '' && errors.idPais === ''){
                return false;
            }else{
                return true;
            }
        }
        return true;
    }
    function submitFormActivity(e){
        e.preventDefault();
        dispatch(createActivity(newActivity)).then(data=>{
            if(!data.msjError){
                dispatch(setAlert('New Activity Create'));
                setNewActivity(createObject());
                setErrors(createObject('Error'))
            }
        });
    }
    return(
        <div>
            <form action="createActivity" onSubmit={e => submitFormActivity(e)}>
                <fieldset>
                    <legend>New Actvity</legend>
                    <div> 
                            <label htmlFor={NAME}>Name <span>{(errors.name !== 'Error' && errors.name) && errors.name}</span></label>
                        <input key={NAME} type="text" name={NAME} id={NAME}  value={newActivity.name} onChange={e=>handleOnChange(e.target)} className={(errors.name !== 'Error' && errors.name) && style.alert}/>
                    </div>
                    <div>
                        <label htmlFor={DIFFICULTY}>Difficulty <span>{(errors.difficulty !== 'Error' && errors.difficulty) && errors.difficulty}</span></label>
                        <select key={DIFFICULTY} id={DIFFICULTY} name={DIFFICULTY} value={newActivity.difficulty} onChange={e=>handleOnChange(e.target)} className={(errors.difficulty !== 'Error' && errors.difficulty) && style.alert}>
                            <option value='' disabled selected>Difficulty</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    <div> 
                        <label htmlFor={DURATION}>Duration (Minutes)<span>{(errors.duration !== 'Error' && errors.duration) && errors.duration}</span></label>
                        <input key={DURATION} type="number" id={DURATION} name={DURATION} value={newActivity.duration} onChange={e=>handleOnChange(e.target)} className={(errors.duration !== 'Error' && errors.duration) && style.alert}/>
                    </div>
                    <div>
                        <label htmlFor={SEASON}>Season <span>{(errors.season !== 'Error' && errors.season) && errors.season}</span></label>
                        <select key={SEASON} id={SEASON} name={SEASON} value={newActivity.season} onChange={e=>handleOnChange(e.target)} className={(errors.season !== 'Error' && errors.season) && style.alert}>
                            <option value='' disabled selected>Season</option>
                            <option value={SUMMER}>Summer</option>
                            <option value={AUTUMN}>Autumn</option>
                            <option value={WINTER}>Winter</option>
                            <option value={SPRING}>Spring</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor={IDPAIS}>IdPais <span>{(errors.idPais !== 'Error' && errors.idPais) && errors.idPais}</span></label>
                        <select key={IDPAIS} id={IDPAIS} name={IDPAIS} onChange={e=>handleOnChange(e.target)} value={newActivity.idPais.length > 0 ? newActivity.idPais[newActivity.idPais.length-1] : ''} className={(errors.idPais !== 'Error' && errors.idPais) && style.alert}>
                            <option value='' disabled selected>IdPais</option>
                            {countries.length > 0 && countries.map(country =>{
                                return <option value={country.id} key={country.id}>{country.name}</option>
                            })}
                        </select>
                    </div>
                    <div>
                        <h3>Added Countries</h3>
                        <div className={style.containerAddedCountries}>
                            {newActivity.idPais.length > 0 && newActivity.idPais.map(pais =>{
                                return <button key={pais} id={pais} onClick={e => RemoveId(e.target)} className={style.delete}>{pais}</button>
                            })}
                        </div>
                    </div>
                    <div className={style.right}>
                        <button disabled={statusButton()} className={style.createActivity}>Create Activity</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}