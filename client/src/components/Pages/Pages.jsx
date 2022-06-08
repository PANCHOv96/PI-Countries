import React from "react";
import { useDispatch,useSelector } from  'react-redux';
import { setNumberPage } from "../../actions/index.js";

export default function Pages(){
    const dispatch = useDispatch();
    let paginado = [];
    const {pageMax, pageActuality} = useSelector((state) => state);
    (function(){
        for (let i = 1; i <=pageMax; i++){
            paginado.push(i);
        }
    })();
    function pagination(page){
        page = parseInt(page);
        if(typeof page == 'number' && page <= pageMax && page !== pageActuality){
            dispatch(setNumberPage(page))
        }
    }
    return(
        <div>
            <h2>Pagination</h2>
            {pageMax && 
                paginado.map(pag =>{
                    return <button key={pag} value={pag} onClick={e => pagination(e.target.value)}>{pag}</button>
                })
            }
        </div>
    );
}