import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ethers } from "ethers"
import axios from 'axios'

import LibraryJSON from '../Library.json'

function BookDetails() {

    let {tokenId} = useParams();
    const [ book, setBook ] = useState();

    useEffect(() => {
        getBook(tokenId);
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
        console.log("Book Info: ",book);
        const tokenURI = await connectedContract.tokenURI(tokenId);
        let metadataURL = getIPFSGatewayURL(tokenURI);
        let meta = await axios.get(metadataURL);
        meta = meta.data;
        console.log("Meta Info: ",meta)
        let item = {
            name: meta.name,
            author: meta.author,
            description: meta.description,
            link: meta.link,
            image: meta.image
            //price: ethers.utils.formatUnits(book.price.toString(), 'ether'),
            // genre: book.genre,
            // downloadCount: book.downloadCount
        }
        console.log("MY ITEM: ",item);
        return item;
    }

    return (
        <div>
            render single book details
            
        </div>
    )
}

export default BookDetails
