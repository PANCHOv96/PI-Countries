import React ,{useEffect} from "react";
import { useState } from "react";
import { useDispatch,useSelector } from  'react-redux';
import { setNumberPage } from "../../actions/index.js";
import style from './Pages.module.css';

export default function Pages(){
    const dispatch = useDispatch();
    const [paginado,setPaginado] = useState([1]);
    const {pageMax, pageActuality} = useSelector((state) => state);
    useEffect(()=>{
        let array=[];
        for (let i = 1; i <= pageMax; i++){
            array.push(i);
        }
        setPaginado(array);
    },[pageMax]);
    function pagination(page){
        page = parseInt(page);
        if(typeof page == 'number' && page <= pageMax && page !== pageActuality){
            dispatch(setNumberPage(page))
        }
    }
    return(
        <div className={style.container}>
            {pageMax && 
                paginado.map(pag =>{
                    return <div><button key={pag} value={pag} onClick={e => pagination(e.target.value)} className={pag===pageActuality && style.active}>{pag}</button></div>
                })
            }
        </div>
    );
}