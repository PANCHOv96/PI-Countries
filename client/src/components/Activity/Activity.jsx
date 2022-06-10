import React ,{ useEffect ,useState} from "react";
import { useDispatch ,useSelector} from  'react-redux';
import { createActivity, getActivity, getCountryAll } from "../../actions/index.js";
const NAME='name';
const DIFFICULTY='difficulty';
const DURATION='duration';
const SEASON='season';
const IDPAIS='idPais';

export default function Activity(){
    const dispatch = useDispatch();
    const obj = {
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        idPais: []
    };
    const countries = useSelector((state) => state.country);
    const activity = useSelector((state) => state.activity);
    const [newActivity,setNewActivity] = useState(obj);
    const [errors,setErrors] = useState({...obj,idPais:''});
    useEffect(()=>{
        dispatch(getCountryAll({country:true}));
    },[dispatch]);
    function handleOnChange(e){
        if(e.name === IDPAIS){
            setNewActivity({...newActivity,[e.name]: [...newActivity.idPais,e.value]});
        }else{
            setNewActivity({...newActivity,[e.name]: e.value});
        }
        validate(e)
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
                if (data < 0 || data > 5 || data == '') msjError = 'Nivel Invalido';
                break;
            case DURATION:
                if (isNaN(data) || (data - Math.floor(data) !== 0)) msjError = 'Solo Numeros Enteros';
                break;
            case SEASON:
                if (data !== 'Summer' && data !== 'Autumn' && data !== 'Winter' && data !== 'Spring' && data === '' && !/^[a-zA-Z ]*$/.test(data)) msjError = 'Temporada Incorrecta';
                break;
            case IDPAIS:
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
    }
    function statusButton(){
        if(newActivity.name === '' || newActivity.difficulty === '' || newActivity.duration === '' || newActivity.season === '' || newActivity.idPais.length === 0 ){
            if(errors.name !== '' || errors.difficulty !== '' || errors.duration !== '' || errors.season !== '' || errors.idPais !== ''){
                return true;
            }
        }
        return false
    }
    function submitFormActivity(e){
        e.preventDefault();
        dispatch(createActivity(newActivity));
    }
    return(
        <div>
            <form action="createActivity" onSubmit={e => submitFormActivity(e)}>
                <div> 
                    {console.log('obj',newActivity)}
                    {console.log('Error',errors)}
                    <label htmlFor={NAME}>Name</label>
                    <input key={NAME} type="text" name={NAME} id={NAME} value={newActivity.name} onChange={e=>handleOnChange(e.target)}/>
                </div>
                <div>
                    <label htmlFor={DIFFICULTY}>Difficulty</label>
                    <select key={DIFFICULTY} id={DIFFICULTY} name={DIFFICULTY} value={newActivity.difficulty} onChange={e=>handleOnChange(e.target)}>
                        <option value='' disabled selected>Difficulty</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                </div>
                <div> 
                    <label htmlFor="duration">Duration</label>
                    <input key={DURATION} type="number" id="duration" name="duration" value={newActivity.duration} onChange={e=>handleOnChange(e.target)}/>
                </div>
                <div>
                    <label htmlFor={SEASON}>Season</label>
                    <select key={SEASON} id={SEASON} name={SEASON} value={newActivity.season} onChange={e=>handleOnChange(e.target)}>
                        <option value='' disabled selected>Season</option>
                        <option value='Summer'>Summer</option>
                        <option value='Autumn'>Autumn</option>
                        <option value='Winter'>Winter</option>
                        <option value='Spring'>Spring</option>
                    </select>
                </div>
                <div>
                    <label htmlFor={IDPAIS}>IdPais</label>
                    <select key={IDPAIS} id={IDPAIS} name={IDPAIS} onChange={e=>handleOnChange(e.target)}>
                        <option value='' disabled selected>IdPais</option>
                        {countries.length > 0 && countries.map(country =>{
                            return <option value={country.id} key={country.id}>{country.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <h3>Paises Agregados</h3>
                    {newActivity.idPais.length > 0 && newActivity.idPais.map(pais =>{
                        return <p>{pais} - <button key={pais} id={pais} onClick={e => RemoveId(e.target)}>Eliminar</button></p>
                    })}
                </div>
                <button disabled={statusButton()}>Create</button>
            </form>
        </div>
    );
}