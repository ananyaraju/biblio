// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Library is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address payable owner;
    uint256 listPrice = 0.0 ether;

    struct BookToken {
        uint256 tokenId;
        address payable publisher;
        uint256 price;
        uint256 downloadCount;
        uint256 genre;
    }

    event BookTokenSuccess (
        uint256 indexed tokenId,
        address payable publisher,
        uint256 price,
        uint256 downloadCount,
        uint256 genre
    );

    mapping(uint256 => BookToken) private idToBookToken;

    constructor() ERC721("Library", "LIB") {
        owner = payable(msg.sender);
    }

    //Creating a book token
    function createToken(string memory tokenURI, uint256 price, uint256 genre) public payable returns (uint) {

        //Make sure sender sent enough ETH to pay for listing
        require(msg.value == listPrice, "Send the correct price");
        //Sanity check
        require(price > 10000000000000000, "Make sure the price isn't less than 0.01 ETH");

        //Increment token ID counter
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        //Minting NFT to the address who called createToken
        _safeMint(msg.sender, newTokenId);
        //Map tokenId to tokenURI (IPFS URI)
        _setTokenURI(newTokenId, tokenURI);

        //Updating mapping of tokenIds to Token details
        idToBookToken[newTokenId] = BookToken(
            newTokenId,
            payable(msg.sender),
            price,
            0,
            genre
        );

        //Emit the event for successful transfer
        emit BookTokenSuccess(
            newTokenId,
            payable(msg.sender),
            price,
            0,
            genre
        );

        return newTokenId;

    }

    //Returning details of a specific book in e-library
    function getBookDetails(uint T_ID) public view returns (BookToken[] memory) {
        uint bookCount = _tokenIds.current();
        BookToken[] memory bookDetails = new BookToken[](1);
        for (uint i=0; i<bookCount; i++) {
            if (idToBookToken[i+1].tokenId == T_ID) {
                BookToken storage currentItem = idToBookToken[i+1];
                bookDetails[0] = currentItem;
            }
        }
        return bookDetails;
    }

    //Returning all books listed for sale
    function getAllBooks() public view returns (BookToken[] memory) {
        uint bookCount = _tokenIds.current();
        BookToken[] memory books = new BookToken[](bookCount);
        uint currentIndex = 0;
        uint currentId;
        for (uint i=0; i<bookCount; i++) {
            currentId = i+1;
            BookToken storage currentItem = idToBookToken[currentId];
            books[currentIndex] = currentItem;
            currentIndex++;
        }
        return books;
    }

    //Execution of a sale
    function buyBook(uint tokenId) public payable {
        uint price = idToBookToken[tokenId].price;
        address publisher = idToBookToken[tokenId].publisher;
        uint currDownloads = idToBookToken[tokenId].downloadCount;
        require(msg.value == price, "Please pay the asking price to complete the purchase");
        idToBookToken[tokenId].downloadCount = currDownloads+1;
        payable(publisher).transfer(msg.value);
    }

}