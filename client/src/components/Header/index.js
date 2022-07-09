import React from 'react';
import { Link } from 'react-router-dom';
import "../../components/Header/index.scss";

function Header() {
    return (
        <header>
            <Link to="/">
                <h2>THOUGHT BOXER</h2>
            </Link>
        </header>
    )
};

export default Header;