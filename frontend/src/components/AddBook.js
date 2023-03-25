import React, {useState} from 'react';
import { NFTStorage } from "nft.storage";
import LibraryJSON from "../Library.json";
import { ethers } from 'ethers';
const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGFEQjA0NkVhMGY5YTA1ZmUxOTYwN2JjOTI3ODFjNDBhNkRmNURhOGIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3OTYwMzM0ODE3MSwibmFtZSI6IkJpYmxpbyJ9.HLD1ltmDUn-QvaSDo0juE4BBD6Iayt9lKE2Z6vqbNgs";

const MintNFT =() => {

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [genre, setGenre] = useState('1');
    const [link, setLink] = useState('1');

    const [errorMessage, setErrorMessage] = useState(null);
    const [uploadedFile, setUploadedFile] = useState();
    const [imageView, setImageView] = useState();
    const [metaDataURL, setMetaDataURl] = useState();
    const [txURL, setTxURL] = useState();
    const [txStatus, setTxStatus] = useState();

    const handleFileUpload = (event) => {
        console.log("file is uploaded");
        setUploadedFile(event.target.files[0]);
        setTxStatus("");
        setImageView("");
        setMetaDataURl("");
        setTxURL("");
    }

    const uploadNFTContent = async(inputFile, name, author, description, link) =>{
        const nftStorage = new NFTStorage({token: APIKEY,});
        try {
            setTxStatus("Uploading NFT to IPFS & Filecoin via NFT.storage.");
            const metaData = await nftStorage.store({
                name: name,
                author: author,
                description: description,
                link: link,
                image: inputFile
            });
            setMetaDataURl(getIPFSGatewayURL(metaData.url));
            return metaData;

        } catch (error) {
            setErrorMessage("Could not save NFT to NFT.Storage - Aborted minting.");
            console.log(error);
        }
    }

    const getIPFSGatewayURL = (ipfsURL)=>{
        let urlArray = ipfsURL.split("/");
        let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
        return ipfsGateWayURL;
    }

    const previewNFT = (metaData, bookToken) =>{
        let imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
        console.log(metaData.data.image.pathname);
        setImageView(imgViewString);
        setMetaDataURl(getIPFSGatewayURL(metaData.url));
        setTxURL('https://explorer.pops.one/tx/'+ bookToken.hash);
        setTxStatus("NFT is minted successfully!");
    }

    const mintNFTToken = async(event, uploadedFile) =>{
        event.preventDefault();
        //1. upload NFT content via NFT.storage
        const metaData = await uploadNFTContent(uploadedFile, name, author, description, link);
        console.log(metaData)  
        //2. Mint a NFT token on biblio
        const bookToken = await sendToBiblio(metaData);
        console.log(bookToken);
        //3. preview the minted nft
        previewNFT(metaData, bookToken);
    }

    const sendToBiblio = async(metadata) =>{
        try {
            setTxStatus("Sending mint transaction to biblio Blockchain.");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const connectedContract = new ethers.Contract(
                LibraryJSON.address,
                LibraryJSON.abi,
                provider.getSigner()
            );
            console.log(price);
            const weiPrice = ethers.utils.parseUnits(price, 'ether')
            console.log(weiPrice);
            const bookToken = await connectedContract.createToken(metadata.url, weiPrice, genre);
            return bookToken;
        } catch (error) {
            setErrorMessage("Failed to send tx to biblio.");
            console.log(error);
        }
    }

    return(
        <div className='MintNFT'>
            <form>
                <h3>Mint your NFT on biblio & Filecoin/IPFS</h3>
                <input type="file" onChange={handleFileUpload}></input>
                <br/>Name: <input type="text" name="name" onChange={(event)=>{setName(event.target.value)}}/>
                <br/>Author: <input type="text" name="author" onChange={(event)=>{setAuthor(event.target.value)}}/>
                <br/>Description: <input type="textarea" name="description" onChange={(event)=>{setDescription(event.target.value)}}/>
                <br/>Price: <input type="number" step="any" onChange={(event)=>{setPrice(event.target.value)}}></input>
                <br/>Genre:
                <select className="genre" onChange={(event)=>{setGenre(event.target.value)}}>
                    <option value="1">Mystery</option>
                    <option value="2">Sci-Fi</option>
                    <option value="3">Y/A</option>
                    <option value="4">Manga</option>
                    <option value="5">Fiction</option>
                    <option value="6">True Crime</option>
                </select>
                <br/>Downloadable link: <input type="text" name="link" onChange={(event)=>{setLink(event.target.value)}}/>
                <br/>
                <button onClick={e=>mintNFTToken(e, uploadedFile)}>Mint NFT</button>
            </form>
            {txStatus && <p>{txStatus}</p>}
            {imageView && <img className='NFTImg' src={imageView} alt="NFT preview"/>}
            {metaDataURL && <p><a href={metaDataURL}>Metadata on IPFS</a></p>}
            {txURL && <p><a href={txURL}>See the mint transaction</a></p>}
            {errorMessage}
        </div>
        
    );
}
export default MintNFT;