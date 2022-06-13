import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import BtnActivity from "../Activity/BtnActivity";
import Searchbar from "../Search/Searchbar";
import style from './Header.module.css';

export default function Header(){
    return(
        <div>
            <div className={style.header}>
                <div>
                    <Link to={`/`}>
                        <h1 className={style.title}>Henry Countries</h1>
                    </Link>
                </div>
                <div>
                    <Routes>
                        <Route exact path='/home' element={<Searchbar />}  />
                    </Routes>
                </div>
                <div>
                    <Routes>
                        <Route exact path='/home' element={<BtnActivity />}  />
                    </Routes>
                </div>
            </div>
        </div>
    );
}