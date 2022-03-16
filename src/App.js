import './App.css';
import { React, useState } from "react";
import getResultsFromWiki from './searchWikipedia';
import getBluesFromWiki from './getWikiBlues';
import mapResults from './getViewsPerPage';
function App() {

 const [searchTerm, setSearchTerm] = useState("")
 const [topTen, setTopTen] = useState([])

 const resultList = []
 
 for(let titles in topTen){
   resultList.push(<li key={titles}>{topTen[titles]}</li>)
 }

  async function getResults(term){
    setTopTen(await getResultsFromWiki(term))
  }
  async function getLinkResults(term){
    setTopTen(await getBluesFromWiki(term))
  }
  async function getSortedResults(term){
    let rawResults = await getBluesFromWiki(term)
    let theResults = await mapResults(rawResults)
    let newResults = []
    //console.log(theResults[0].title);
    theResults.forEach(element => {
      newResults.push(element.title)
    });
    setTopTen(newResults);
  }

  let inputHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <div className='iconWrap'/> 
      <h1 className='App-header'>Wiki API practice</h1> 
      <div>
        
        <input className='searchbar' type="text" onChange={inputHandler} placeholder="search"/>
        <br/>
        <button onClick={()=>getResults(searchTerm)}>List of articles with word</button>
        <br/>
        <button onClick={()=>getLinkResults(searchTerm)}>List of links within' the article</button>
        <br/>
        <button onClick={()=>getSortedResults(searchTerm)}>List of most viewed articles, linked in the searched one.</button>
        

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
