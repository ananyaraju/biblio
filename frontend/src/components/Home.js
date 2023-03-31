import React from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import TopBar from './TopBar';

import '../biblioCSS/index.scss'
import header from '../images/header.png'

const Home = () => {

  return (

    <div className="home">
      <TopBar />
      <div className="header">
        <h2>Reading a good book is like taking a journey</h2>
        <p>Keep the story going with BIBLIO</p>
        <br />
        <Link className="button" style={{fontSize: "18px", padding: '20px' }} as={Link} to="/library">
          Start Reading <Icon icon="material-symbols:arrow-outward-rounded" />
        </Link>
      </div>
      <div>
        <img src={header} className="header-img" alt=""/>
      </div>
    </div>

  )
}

export default Home
