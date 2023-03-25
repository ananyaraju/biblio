import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

function BookDetails() {
    let {tokenId} = useParams();
    console.log("TOKEN ID:",tokenId);
    // const thisProduct = productsData.find(prod => prod.id === productId)

    return (
        <div>
            {/* <h1>{thisProduct.name}</h1>
            <p>Price: ${thisProduct.price}</p>
            <p>{thisProduct.description}</p> */}
        </div>
    )
}

export default BookDetails
