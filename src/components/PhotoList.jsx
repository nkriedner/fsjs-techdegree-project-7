import React from "react";
import Photo from "./Photo";

const PhotoList = ({ imageData }) => {
    // console.log(imageData);
    let images = imageData.map((image) => {
        const imageUrl = `https://live.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
        // console.log(imageUrl);
        return <Photo url={imageUrl} key={image.id} />;
    });

    return (
        <div className="photo-container">
            <h2>Results</h2>
            <ul>
                {images}

                {/* <li className="not-found">
                    <h3>No Results Found</h3>
                    <p>You search did not return any results. Please try again.</p>
                </li> */}
            </ul>
        </div>
    );
};

export default PhotoList;
