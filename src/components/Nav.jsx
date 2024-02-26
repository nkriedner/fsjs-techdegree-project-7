import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="main-nav">
            <ul>
                <li>
                    <Link to="/forest">Forest</Link>
                </li>
                <li>
                    <Link to="/mountain">Mountain</Link>
                </li>
                <li>
                    <Link to="/desert">Desert</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
