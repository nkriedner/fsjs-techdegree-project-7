import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import apiKey from "./config";
import PhotoList from "./components/PhotoList";
import Nav from "./components/Nav";
import Search from "./components/Search";

function App() {
    // Set state for the images to be fetched
    const [forestImages, setForestImages] = useState([]);
    const [mountainImages, setMountainImages] = useState([]);
    const [desertImages, setDesertImages] = useState([]);
    // const [searchImages, setSearchImages] = useState([]);

    // Fetch Data Function
    function fetchData(query, setDataFunction) {
        fetch(
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey.key}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
        )
            .then((response) => response.json())
            .then((responseData) => setDataFunction(responseData.photos.photo))
            .catch((error) => console.log("Error fetching and parsing image data:", error));
    }

    // Call fetchData when component mounts
    useEffect(() => {
        fetchData("forest", setForestImages);
        fetchData("mountain", setMountainImages);
        fetchData("desert", setDesertImages);
    }, []);

    return (
        <>
            <div className="container">
                <Search />
                <Nav />
                <Routes>
                    <Route path="/" element={<Navigate to="/forest" />} />
                    <Route
                        path="forest"
                        element={<PhotoList imageData={forestImages} pageTitle="Forest images from Flickr API" />}
                    />
                    <Route
                        path="mountain"
                        element={<PhotoList imageData={mountainImages} pageTitle="Mountain images from Flickr API" />}
                    />
                    <Route
                        path="desert"
                        element={<PhotoList imageData={desertImages} pageTitle="Desert images from Flickr API" />}
                    />
                </Routes>
            </div>
        </>
    );
}

export default App;
