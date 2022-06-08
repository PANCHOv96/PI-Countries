import React ,{ useEffect } from "react";
import { useDispatch ,useSelector} from  'react-redux';
import { getCountryID } from "../../actions/index.js";

export default function BtnActivity(){
    const dispatch = useDispatch();
    return(
        <div>
            <button>Create Activity</button>
        </div>
    );
}