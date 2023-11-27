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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideBar></SideBar>
        <Routes>
          <Route
            path="/"
            element={<Home></Home>}></Route>
          <Route
            path="/library"
            element={<Library></Library>}></Route>
          <Route
            path="/search"
            element={<SearchResault></SearchResault>}></Route>
          <Route
            path="/search/albumPage/:id"
            element={<Album></Album>}></Route>
          <Route
            path="/albumPage/:id/"
            element={<Album></Album>}></Route>
          <Route
            path="/artistPage/:id/:artist/albumPage/:id"
            element={<Album></Album>}></Route>
          <Route
            path="/artistPage/:id/:artist/"
            element={<Artist></Artist>}></Route>
        </Routes>
        <Player></Player>
      </BrowserRouter>
    </div>
  );
}

export default App;
