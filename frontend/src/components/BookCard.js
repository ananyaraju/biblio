import { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { ethers } from 'ethers'
import { Link } from "react-router-dom";

import LibraryJSON from '../Library.json'
import '../biblioCSS/index.scss'

function BookCard (data) {

    let metaData = data;
    const [imageView, setImageView] = useState();
    const [transactionComplete, setTransactionComplete] = useState(false);

    const getIPFSGatewayURL = (ipfsURL)=>{
        let urlArray = ipfsURL.split("/");
        let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
        return ipfsGateWayURL;
    }
    
    const previewNFT = () =>{
        console.log(metaData.data.image);
        let imgViewString = getIPFSGatewayURL(metaData.data.image);
        setImageView(imgViewString);
    }

    useEffect(() => {
        previewNFT();
    }, [])

    async function buyNow() {
    
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const connectedContract = new ethers.Contract(
                LibraryJSON.address,
                LibraryJSON.abi,
                provider.getSigner()
            );
            const salePrice = ethers.utils.parseUnits(data.data.price, 'ether')
            let transaction = await connectedContract.buyBook(data.data.tokenId, {value:salePrice})
            await transaction.wait()
            setTransactionComplete(true);
            alert("Successfully purchased product!");
        }
        catch(e) {
            alert( "Purchase error "+e )
        }
    }


    // <Link className="card-link" to={`/bookPage/${data.data.tokenId}`}></Link>
    return (
        <div className="book-card">
            <Link className="card-link" to={`/bookPage/${data.data.tokenId}`}>
                <img className='NFTImg' src={imageView} alt="NFT preview"/>
                <div className="book-info">
                    <div className="name">{data.data.name}</div>
                    <div className="author">By: {data.data.author}</div>
                    <div className="price">
                        <Icon className="eth" icon="logos:ethereum" />
                        <div className="money">{data.data.price}</div>
                    </div>
                </div>
                {/* { transactionComplete ? (
                    <div>
                        <a href={data.data.link} download>Download your book now!</a>
                    </div>
                ) : <p></p>} */}
            </Link>
        </div>
        
    )
}

export default BookCard;