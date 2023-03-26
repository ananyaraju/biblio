import '../biblioCSS/index.scss'

import { useState, useEffect } from 'react';

function BookTemplate (data) {

    let metaData = data;
    const [imageView, setImageView] = useState();
    const [transactionComplete, setTransactionComplete] = useState(false);

    const getIPFSGatewayURL = (ipfsURL)=>{
        let urlArray = ipfsURL.split("/");
        let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
        return ipfsGateWayURL;
    }
    
    const previewNFT = () =>{
        let imgViewString = getIPFSGatewayURL(metaData.data.image);
        setImageView(imgViewString);
    }

    useEffect(() => {
        previewNFT();
    }, [])

    return (
        <div>
            <br/>{data.data.image}

            <br/>{data.data.name}
            <br/>{data.data.author}
            <br/>{data.data.description}
            
            <br/>{data.data.price}
            <br/>{data.data.genre}
            <br/>{data.data.downloadCount}

            <br/>{data.data.link}
        </div>
        
    )
}

export default BookTemplate;