import React from "react";
import Photo from "./Photo";

const PhotoList = ({ imageData, pageTitle }) => {
    // console.log("imageData:", imageData);
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
                {images.length > 0 ? (
                    images
                ) : (
                    <li className="not-found">
                        <h3>No Results Found</h3>
                        <p>You search did not return any results. Please try again.</p>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default PhotoList;
