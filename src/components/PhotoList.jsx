import React from "react";
import Photo from "./Photo";
import NoResults from "./NoResults";

const PhotoList = ({ imageData, pageTitle, isLoading }) => {
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
