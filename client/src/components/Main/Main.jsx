import React from "react";
import { Link } from "react-router-dom";
import style from './Main.module.css';

export default function Main(){
    return(
        <div className={style.background}>
            <div className={style.center}>
                <p className={style.description}>Welcome to my first react project....</p>
                <div>
                    <Link to={`/home`}>
                        <button className={style.start}>START</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}