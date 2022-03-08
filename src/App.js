import './App.css';
import { React, useState } from "react";
import getResultsFromWiki from './searchWikipedia';

function App() {

 const [searchTerm, setSearchTerm] = useState("")
 const [topTitles, setTopTitles] = useState([])

 const resultList = []
 for(let titles in topTitles){
   resultList.push(<li key={titles}>{topTitles[titles]}</li>)
 }

  async function getResults(term){
    setTopTitles(await getResultsFromWiki(term))
  }

  let inputHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <div className='iconWrap'/> 
      <h1 className='App-header'>Wiki Practice Search</h1> 
      <div>
        <input className='searchbar' type="text" onChange={inputHandler} placeholder="search"/>
        <button onClick={()=>getResults(searchTerm)}>Search</button>
        <ul className='App-list'>
          {resultList}
        </ul>
      </div>   
    </div>
  );
}

export default App;

/*
Extra information on search bars: https://dev.to/salehmubashar/search-bar-in-react-js-545l
Torturial on wiki API, somewhat used: https://www.youtube.com/watch?v=STeR5Adju1w
*/ 
