import React from "react";
import { useDispatch ,useSelector} from  'react-redux';
import { setAlert } from "../../actions/index.js";
import style from './MsjAlert.module.css';

export default function MsjAlert(){
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert);
    function fnclose(){
        dispatch(setAlert());
    }
    function getMsj(){
        return (
            <div className={style.backgound}>
                <div className={style.container}>
                    <h2 className={style.title}>{alert.message}</h2>
                    <button onClick={fnclose} className={style.close}>Close</button>
                </div>
            </div>
        );
    }
    return(
        <div>
            {alert.message && getMsj()}
        </div>
    );
}