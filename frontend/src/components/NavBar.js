import React from 'react'
import { Link } from 'react-router-dom'

import bibliologo from '../images/bibliologo.png'
import settings from '../images/settings.png'
import lib from '../images/library.png'
import add from '../images/addbook.png'

import '../biblioCSS/index.scss'

const NavBar = () => {

    return (

        <>
            <div className="Navbar">
                <Link as={Link} to="/">
                    <img src={bibliologo} alt="" className="bibliologo" />
                </Link>
                <div className="line" />
                <div className="button-bar">
                    <Link as={Link} to="/library" className="nav-button">
                        <img src={lib} alt="" />
                    </Link>
                    <Link as={Link} to="/addBook" className="nav-button">
                        <img src={add} alt="" />
                    </Link>
                    <Link as={Link} to="/settings" className="nav-button">
                        <img src={settings} alt="" />
                    </Link>
                </div>
            </div>
            

        </>

    )

}

export default NavBar;
