import React from "react";
import { Link } from "react-router-dom";

export default function Main(){
    return(
        <div>
            <h2>Main</h2>
            <Link to={`/home`}>
                <button>Start</button>
            </Link>
        </div>
    );
}