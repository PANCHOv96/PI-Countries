import React from "react";
import { Link } from "react-router-dom";
import style from './BtnActivity.module.css';

export default function BtnActivity(){
    return(
        <div>
            <Link to={`/activity`}>
                <button className={style.btn}>Create Activity</button>
            </Link>
        </div>
    );
}