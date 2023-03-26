import '../biblioCSS/index.scss'
import BookCard from './BookCard'
import TopBar from './TopBar';

import React, { useState } from 'react';
import LibraryJSON from "../Library.json";
import { ethers } from 'ethers';
import axios from "axios";

const Library = () => {

  const sampleData = [];
  const [libraryData, updateLibraryData] = useState(sampleData);
  const [libraryDataFetched, libraryUpdateFetched] = useState(false);
  const [imageView, setImageView] = useState();

  const getIPFSGatewayURL = (ipfsURL)=>{
    let urlArray = ipfsURL.split("/");
    let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  }

  const previewNFT = ({data}) =>{
    console.log(data.data.image);
    let imgViewString = getIPFSGatewayURL(data.data.image.pathname);
    setImageView(imgViewString);
  }

  async function getAllNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedContract = new ethers.Contract(
        LibraryJSON.address,
        LibraryJSON.abi,
        provider.getSigner()
    );
    let allBooks = await connectedContract.getAllBooks()
    const items = await Promise.all(allBooks.map(async i => {
      const tokenURI = await connectedContract.tokenURI(i.tokenId);
      let metadataURL = getIPFSGatewayURL(tokenURI);
      let meta = await axios.get(metadataURL);
      meta = meta.data;
      let item = {
        price: ethers.utils.formatUnits(i.price.toString(), 'ether'),
        tokenId: i.tokenId.toNumber(),
        name: meta.name,
        author: meta.author,
        description: meta.description,
        image: meta.image,
        downloadCount: i.downloadCount,
        genre: i.genre,
        publisher: i.publisher,
        link: meta.link
      }
      return item;
    }))
    console.log("e-Library: ",items);
    libraryUpdateFetched(true);
    updateLibraryData(items);
  }

  if(!libraryDataFetched) {
    getAllNFTs();
  }

  return (

      <div className="library">
        <TopBar/>
        <p>Explore our Library</p>
        <div className="books-container">
          {libraryData.map((value, index) => {
            console.log(value);
            return <BookCard data={value} key={index}></BookCard>;
          })}
        </div>
      </div>

  )

}

export default Library
