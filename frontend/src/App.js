import './biblioCSS/index.scss'

import NavBar from './components/NavBar'
import Home from './components/Home'
import AddBook from './components/AddBook'
import Library from './components/Library'
import LibraryJSON from "./Library.json"

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import { ethers } from 'ethers';

function App() {

  // eslint-disable-next-line
  const [loading, setLoading] = useState(true) 
  const [account, setAccount] = useState(null)
  // eslint-disable-next-line
  const [library, setLibrary] = useState({})

    // MetaMask Connect
    const web3Handler = async () => {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if(chainId !== '0x5')
      {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
       })
      }  
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts'})
      setAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      loadContracts(signer)
    }
  
    // LoadContracts
    const loadContracts = async (signer) => {
      const library = new ethers.Contract(LibraryJSON.address, LibraryJSON.abi, signer)
      setLibrary(library)
      setLoading(false)
    }

  return (
    <div className="App">
      <BrowserRouter>
        <>
          <NavBar />
          <div>
            <Routes>
              <Route path="/" element={<Home web3Handler={web3Handler} account={account}/>} />
              <Route path="/library" element={<Library />} />
              <Route path="/addBook" element={<AddBook />} />
            </Routes>
          </div>
        </>
      </BrowserRouter>
    </div>
  );
}

export default App;
