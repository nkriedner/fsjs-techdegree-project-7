import { useEffect, useState } from "react";
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
                <PhotoList />
            </div>
        </>
    );
}

export default App;
