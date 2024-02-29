import React, { useEffect } from "react";
import Photo from "./Photo";
import NoResults from "./NoResults";
import { useParams } from "react-router-dom";

const PhotoList = ({ imageData, pageTitle, isLoading, fetchData }) => {
    let { query } = useParams();

    // Check if query is equal to pageTitle (which is the search query)
    // If it is not equal make a new fetch request for the query in the url
    // (this is to ensure correct page updates when clicking forward/back in browser)
    useEffect(() => {
        if (query !== undefined) {
            if (query !== pageTitle) {
                fetchData(query);
            }
        }
    });

    let images = imageData.map((image) => {
        const imageUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
        return <Photo url={imageUrl} key={image.id} />;
    });

    return (
        <div className="photo-container">
            {/* Show pageTitle if there are images */}
            {images.length > 0 ? <h2>Flickr photos for: {pageTitle}</h2> : null}

            <ul>
                {/* Show images or no results message */}
                {isLoading ? <p>Loading...</p> : images.length > 0 ? images : <NoResults />}
            </ul>
        </div>
    );
};

export default PhotoList;
