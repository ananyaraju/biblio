import '../biblioCSS/index.scss'

import React, {useState} from 'react';
import LibraryJSON from "../Library.json";
import { ethers } from 'ethers';

const Library = () => {

  const books = [];
  const allBooks = ["hello"];
  const [libraryData, updateLibraryData] = useState(books);
  const [libraryDataFetched, libraryUpdateFetched] = useState(false);

  async function getAllNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedContract = new ethers.Contract(
        LibraryJSON.address,
        LibraryJSON.abi,
        provider.getSigner()
    );
    let allBooks = await connectedContract.getAllBooks()
    console.log(allBooks);
    
  }

  return (

    <div className="library">
      <p>Explore our Library</p>
      <div>
        hello
      </div>
    </div>

  )

}

export default Library
