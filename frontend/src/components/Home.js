import React from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import '../biblioCSS/index.scss'

const Home = ({ web3Handler, account }) => {

  return (

    <div className="home">

      <div className="top-nav">
        <div>
          <Icon className="icon" icon="ri:search-line" />
          <input type="search" placeholder="search"/>
        </div>
        <>
          { account ? (
            <div>
              <Icon className="icon" style={{height: '25px', width: '23px', marginTop: '2px'}} icon="material-symbols:account-circle-outline" />
              <span className="accID">{account.slice(0, 6) + '...' + account.slice(37, 42)}</span>
            </div>
          ) : (
            <button onClick={web3Handler} className="button" style={{padding: '6px', borderRadius: '8px', marginRight: '10px'}}>Connect Wallet</button>
          )}
        </>
      </div>

      <div className="header">
        <h2>Reading a good book is like taking a journey</h2>
        <p>Keep the story going with BIBLIO</p>
        <Link className="button" as={Link} to="/library">
          Start Reading <Icon icon="material-symbols:arrow-outward-rounded" />
        </Link>
      </div>

      <div className="main">

      </div>
      
    </div>
  )
}

export default Home
