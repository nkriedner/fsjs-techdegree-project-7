import React from "react";

const Photo = ({ url }) => {
    return (
        <li>
            <img src={url} alt="" />
            {/* <img src="https://farm5.staticflickr.com/4334/37032996241_4c16a9b530.jpg" alt="" /> */}
        </li>
    );
};

export default Photo;
