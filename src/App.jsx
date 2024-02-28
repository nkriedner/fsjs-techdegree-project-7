import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import apiKey from "./config";
import PhotoList from "./components/PhotoList";
import Nav from "./components/Nav";
import Search from "./components/Search";
import PageNotFound from "./components/PageNotFound";

function App() {
    // Set state for the images to be fetched
    const [forestImages, setForestImages] = useState([]);
    const [mountainImages, setMountainImages] = useState([]);
    const [desertImages, setDesertImages] = useState([]);
    const [searchImages, setSearchImages] = useState([]);
    // Set state for the queries
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch Data Function
    function fetchData(query, setDataFunction) {
        fetch(
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
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

    // Call fetchdata on query searches
    useEffect(() => {
        if (searchQuery) {
            fetchData(searchQuery, setSearchImages);
        }
    }, [searchQuery]);

    // Sets the search query when called:
    const handleQueryChange = (searchText) => {
        setSearchQuery(searchText);
    };

    return (
        <>
            <div className="container">
                <Search changeQuery={handleQueryChange} />
                <Nav />
                <Routes>
                    <Route path="/" element={<Navigate to="/forest" />} />
                    <Route path="forest" element={<PhotoList imageData={forestImages} pageTitle="forest" />} />
                    <Route path="mountain" element={<PhotoList imageData={mountainImages} pageTitle="mountain" />} />
                    <Route path="desert" element={<PhotoList imageData={desertImages} pageTitle="desert" />} />
                    <Route
                        path="search/:query"
                        element={<PhotoList imageData={searchImages} pageTitle={searchQuery} />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
