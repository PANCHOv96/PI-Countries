import React from "react";
import { Link } from "react-router-dom";

export default function BtnActivity(){
    return(
        <div>
            <Link to={`/activity`}>
                <button>Create Activity</button>
            </Link>
        </div>
    );
}