import React from "react";
import { useDispatch ,useSelector} from  'react-redux';
import { setAlert } from "../../actions/index.js";


export default function MsjAlert(){
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert);
    function fnclose(){
        dispatch(setAlert());
    }
    return(
        <div>
            {alert.message && <h2>{alert.message}</h2>}
            {alert.message && <button onClick={fnclose}>Close</button>}
        </div>
    );
}