import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import '../biblioCSS/index.scss'

function BookCard (data) {

    let metaData = data;
    const [imageView, setImageView] = useState();

    const newTo = {
        pathname:"/bookPage/"+data.data.tokenId
    }

    const getIPFSGatewayURL = (ipfsURL)=>{
        let urlArray = ipfsURL.split("/");
        let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
        return ipfsGateWayURL;
    }
    
    const previewNFT = () =>{
        console.log(metaData.data.image);
        let imgViewString = getIPFSGatewayURL(metaData.data.image);
        setImageView(imgViewString);
        console.log(imageView);
    }

    useEffect(() => {
        previewNFT();
    }, [])

    return (
        <div className="book-card">
            <Link className="card-link" to={newTo}>
                <img className='NFTImg' src={imageView} alt="NFT preview"/>
                <div className="name">{data.data.name}</div>
                <div className="author">By: {data.data.author}</div>
                <div className="price">
                    <Icon className="eth" icon="logos:ethereum" />
                    <div className="money">{data.data.price}</div>
                </div>
                {/* <button className="buy"><Link className="card-link">Buy Now</Link></button> */}
            </Link>
        </div>
        
    )
}

export default BookCard;