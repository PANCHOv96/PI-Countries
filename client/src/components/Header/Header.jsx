import React ,{useEffect, useState}from "react";
import { Link , useLocation} from "react-router-dom";
import BtnActivity from "../Activity/BtnActivity";
import Searchbar from "../Search/Searchbar";
import style from './Header.module.css';

export default function Header(){
    const location = useLocation();
    const [styleTitle,setStyleTitle] = useState('');
    useEffect(()=>{
        if(location.pathname === '/home'){
            setStyleTitle(style.header+' '+style.textLeft);
        }else{
            setStyleTitle(style.header);
        }
    },[location]);
    function renderSearhBar(){
        return (
            <div>
                <Searchbar />
            </div>
        )        
    }
    function renderBtnActivity(){
        return(
            <div className={style.btnRight}>
                <BtnActivity />
            </div>
        )
    }
    return(
        <div>
            <div className={styleTitle}>
                <div>
                    <Link to={`/`}>
                        <h1 className={style.title}>Henry Countries</h1>
                    </Link>
                </div>
                {location.pathname === '/home' && renderSearhBar()}
                {location.pathname === '/home' && renderBtnActivity()}
            </div>
        </div>
    );
}