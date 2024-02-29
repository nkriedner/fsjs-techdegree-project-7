import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import apiKey from "./config";
import PhotoList from "./components/PhotoList";
import Nav from "./components/Nav";
import Search from "./components/Search";
import PageNotFound from "./components/PageNotFound";

function App() {
    // Set "static" state for the default images
    const [forestImages, setForestImages] = useState([]);
    const [mountainImages, setMountainImages] = useState([]);
    const [desertImages, setDesertImages] = useState([]);
    // Set "dynamic" state for the searched images
    const [searchImages, setSearchImages] = useState([]);
    // Set state for the queries
    const [searchQuery, setSearchQuery] = useState("");
    // Set state for loading data stage
    const [isLoading, setLoading] = useState(true);

    // Fetch Data Function
    function fetchData(query) {
        setLoading(true);
        fetch(
            `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
        )
            .then((response) => response.json())
            .then((responseData) => {
                if (query === "forest") {
                    setForestImages(responseData.photos.photo);
                } else if (query === "mountain") {
                    setMountainImages(responseData.photos.photo);
                } else if (query === "desert") {
                    setDesertImages(responseData.photos.photo);
                } else {
                    setSearchImages(responseData.photos.photo);
                }
                // setDataFunction(responseData.photos.photo);
                setLoading(false);
            })
            .catch((error) => console.log("Error fetching and parsing image data:", error));
        setSearchQuery(query);
    }

    // Call fetchData for default image categories when component mounts
    useEffect(() => {
        fetchData("forest");
        fetchData("mountain");
        fetchData("desert");
    }, []);

    // Call fetchdata on query searches
    // useEffect(() => {
    //     if (searchQuery) {
    //         fetchData(searchQuery, setSearchImages);
    //     }
    // }, [searchQuery]);

    // Sets the search query when called:
    // const handleQueryChange = (searchText) => {
    //     setSearchQuery(searchText);
    // };

    return (
        <>
            <div className="container">
                <Search />
                {/* <Search changeQuery={handleQueryChange} /> */}
                <Nav />
                <Routes>
                    <Route index element={<Navigate replace to="forest" />} />
                    <Route
                        path="forest"
                        element={<PhotoList imageData={forestImages} pageTitle="forest" isLoading={isLoading} />}
                    />
                    <Route
                        path="mountain"
                        element={<PhotoList imageData={mountainImages} pageTitle="mountain" isLoading={isLoading} />}
                    />
                    <Route
                        path="desert"
                        element={<PhotoList imageData={desertImages} pageTitle="desert" isLoading={isLoading} />}
                    />
                    <Route
                        path="search/:query"
                        element={
                            <PhotoList
                                imageData={searchImages}
                                pageTitle={searchQuery}
                                isLoading={isLoading}
                                fetchData={fetchData}
                            />
                        }
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
