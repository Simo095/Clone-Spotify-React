import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./componets/Home";
import SideBar from "./componets/SideBar";
import Player from "./componets/Player";
import Album from "./componets/Album";
import Artist from "./componets/Artist";
import Library from "./componets/Library";
import SearchResault from "./componets/SearchResault";
import Headerbar from "./componets/Headerbar";
import { useState } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="App">
      <BrowserRouter>
        <Headerbar />
        <SideBar
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
        <Routes>
          <Route
            path="/Clone-Spotify-React"
            element={<Home isSidebarOpen={isSidebarOpen} />}
          ></Route>
          <Route
            path="/Clone-Spotify-React/library"
            element={<Library />}
          ></Route>
          <Route
            path="Clone-Spotify-React/search"
            element={<SearchResault />}
          ></Route>
          <Route
            path="/Clone-Spotify-React/search/albumPage/:id"
            element={<Album />}
          ></Route>
          <Route
            path="/Clone-Spotify-React/albumPage/:id/"
            element={<Album />}
          ></Route>
          <Route
            path="/Clone-Spotify-React/artistPage/:id/:artist/albumPage/:id"
            element={<Album />}
          ></Route>
          <Route
            path="/Clone-Spotify-React/artistPage/:id/:artist/"
            element={<Artist />}
          ></Route>
        </Routes>
        <Player />
      </BrowserRouter>
    </div>
  );
}

export default App;
