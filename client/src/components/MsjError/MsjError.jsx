import React from "react";
import { useDispatch ,useSelector} from  'react-redux';
import { setError } from "../../actions/index.js";


export default function MsjError(){
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);
    function fnclose(){
        dispatch(setError());
    }
    return(
        <div>
            {error.message && <h2>{error.message}</h2>}
            {error.message && <button onClick={fnclose}>Close</button>}
        </div>
    );
}