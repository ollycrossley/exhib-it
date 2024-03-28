"use client"
import React, {useState} from 'react';

const NavBar = () => {
    const [isActive, setIsActive] = useState(false)
    return (
        <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div className={"container"}>
                <div className="navbar-brand">
                    <p className={"navbar-item"}><strong>Exhib-It!</strong></p>
                    <a role="button" className={`navbar-burger ${isActive ? "is-active" : null}`} aria-label="menu"
                       aria-expanded="false"
                       data-target="main-nav" onClick={() => setIsActive(!isActive)}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div id="main-nav" className={`navbar-menu ${isActive ? "is-active" : null}`}>

                    <div className="navbar-end">
                        <a className={"navbar-item"} href={"/"}>
                            <strong>Home</strong>
                        </a>
                        <a className={"navbar-item"} href={"/library"}>
                            <strong>Library</strong>
                        </a>
                        <a className={"navbar-item"} href={"/my-exhibit"}>
                            <strong>My Exhibit</strong>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;