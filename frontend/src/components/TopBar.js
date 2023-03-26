import React from 'react'
import { useContext } from 'react';
import { ethers } from 'ethers';
import { Icon } from '@iconify/react';

import { AccountContext } from './AccountContext';
import LibraryJSON from '../Library.json'

import "../biblioCSS/index.scss"

const TopBar = () => {

    const {account, setAccount} = useContext(AccountContext)
  
      // eslint-disable-next-line
      const settingAccount = async () => {
          const accounts = "accounts array"
          setAccount(accounts[0]);
      } 
  
      const web3Handler = async () => {
  
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if(chainId !== '0x5') {
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
  
    const loadContracts = async (signer) => {
  
        const contract = new ethers.Contract(LibraryJSON.address, LibraryJSON.abi, signer)
        console.log("BIBLIO :", contract)
  
    }
  
    return (
  
      <div>
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
    </div>
        
    )

}

export default TopBar