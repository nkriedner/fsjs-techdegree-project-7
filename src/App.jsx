import { useState } from "react";
import apiKey from "./config";
import PhotoList from "./components/PhotoList";
import Nav from "./components/Nav";
import Search from "./components/Search";

function App() {
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
