import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import apiKey from "./config";
import PhotoList from "./components/PhotoList";
import Nav from "./components/Nav";
import Search from "./components/Search";

function App() {
    const [count, setCount] = useState(0);

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
