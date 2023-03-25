import '../biblioCSS/index.scss'

import React, {useState} from 'react';
import LibraryJSON from "../Library.json";
import { ethers } from 'ethers';

const Library = () => {

  const books = [];
  const [libraryData, updateLibraryData] = useState(books);
  const [libraryDataFetched, libraryUpdateFetched] = useState(false);

  const getIPFSGatewayURL = (ipfsURL)=>{
    let urlArray = ipfsURL.split("/");
    let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
    return ipfsGateWayURL;
}

  async function getAllNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const connectedContract = new ethers.Contract(
        LibraryJSON.address,
        LibraryJSON.abi,
        provider.getSigner()
    );
    let allBooks = await connectedContract.getAllBooks()
    //console.log(allBooks);
    const items = await Promise.all(allBooks.map(async i => {
      const tokenURI = await connectedContract.tokenURI(i.tokenId);
      let metadataURL = getIPFSGatewayURL(tokenURI);
      let tID, tname, tauthor, tdescription, timage, tdowncount, tprice, tgenre, tpub;
      fetch(metadataURL)
      .then((response) => response.json())
      .then((data) => {
        tprice = ethers.utils.formatUnits(i.price.toString(), 'ether');
        tID =  i.tokenId.toNumber();
        tname = data.name;
        tauthor = data.author;
        tdescription = data.description;
        timage = data.image;
        tdowncount = i.downloadCount;
        tgenre = i.genre;
        tpub = i.publisher;
        let item = {
          price: tprice,
          tokenId: tID,
          name: tname,
          author: tauthor,
          description: tdescription,
          image: timage,
          downloadCount: tdowncount,
          genre: tgenre,
          publisher: tpub
        }
        console.log(item);
        return item;
      });
    }))
    console.log(items);
    libraryUpdateFetched(true);
  }

  return (

    <div className="library">
      <p>Explore our Library</p>
      <div>
        <button onClick={getAllNFTs}>GET</button>
        hello
      </div>
    </div>

  )

}

export default Library
