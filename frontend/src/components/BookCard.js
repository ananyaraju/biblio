import { useState, useEffect } from "react";

function BookCard (data) {

    let metaData = data;

    const [imageView, setImageView] = useState();

    const newTo = {
        pathname:"/productPage/"+data.data.tokenId
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
        <div to={newTo}>
            <br/>name: {data.data.name}
            <br/>author: {data.data.author}
            <br/>description: {data.data.description}
            <br/>price: {data.data.price}
            <br/>link: <a href={data.data.link} download>DOWNLOAD HERE</a>
            <img className='NFTImg' src={imageView} alt="NFT preview"/>
        </div>
        
    )
}

export default BookCard;