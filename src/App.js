import React, {useState, useEffect} from 'react'; 
import PokemonList from "./PokemonList";
import axios from 'axios'; 
import Pagination from './Pagination';
import Button from '@material-ui/core/Button'; 

function App() {

  const [pokemon, setPokemon] = useState(["bb", "aa"])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState(); 
  const [prevPageUrl, setPrevPageUrl] = useState(); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () => cancel()

  }, [currentPageUrl])

  function goToNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  if(loading) return "loading"

  return (
    <>
    <Button href="https://alice.com/" size="large" style={{fontSize: 24}} variant="contained" color = "primary">
      Hello Alice
    </Button>
    <PokemonList pokemon = {pokemon} />
    <Pagination 
    goToNextPage={nextPageUrl ? goToNextPage: null} 
    goToPrevPage={prevPageUrl ? goToPrevPage: null}/>
    </>
  );
}

export default App;
