import React from "react";
import { Link } from "react-router-dom";
import style from './BtnActivity.module.css';

export default function BtnActivity(){
    return(
        <div>
            <div className={style.btnActivity}>
                <Link to={`/activity`}>
                    <button>Create Activity</button>
                </Link>
            </div>
        </div>
    );
}