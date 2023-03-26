import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ethers } from "ethers"
import axios from 'axios'

import LibraryJSON from '../Library.json'
import TopBar from './TopBar'

function BookDetails() {

    let {tokenId} = useParams();
    const [tId, setTID] = useState();

    useEffect(() => {
        getBook(tokenId);
        setTID(tokenId);
      }, [tokenId]);


    const getIPFSGatewayURL = (ipfsURL)=>{
      let urlArray = ipfsURL.split("/");
      let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
      return ipfsGateWayURL;
    }

    async function getBook() {
        console.log("TOKEN ID:",tokenId);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const connectedContract = new ethers.Contract(
            LibraryJSON.address, LibraryJSON.abi, provider.getSigner()
        );
        let book = await connectedContract.getBookDetails(tokenId);
        let bookPrice = ethers.utils.formatUnits(Object.values(book)[0].price.toString(), 'ether');
        let bookGenre = Object.values(book)[0].genre.toString();
        let bookDownCount = Object.values(book)[0].downloadCount.toString();
        const tokenURI = await connectedContract.tokenURI(tokenId);
        let metadataURL = getIPFSGatewayURL(tokenURI);
        let meta = await axios.get(metadataURL);
        meta = meta.data;
        let item = {
            name: meta.name,
            author: meta.author,
            description: meta.description,
            link: meta.link,
            image: meta.image,
            price: bookPrice,
            genre: bookGenre,
            downloadCount: bookDownCount
        }
        console.log("MY ITEM: ",item);
        return item;
    }

    return (
        <div className="addbook">
            <TopBar />
        </div>
    )
}

export default BookDetails
