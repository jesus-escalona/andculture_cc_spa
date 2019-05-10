import React from 'react';
import './App.css';
import { Header, SearchBar } from "./components";
import { Breweries } from "./containers";

function App() {
  return (
    <div className="App">
      <Header/>
      <SearchBar />
      <Breweries />
    </div>
  );
}

export default App;
