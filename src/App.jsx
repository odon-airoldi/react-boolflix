import { useState, useEffect } from 'react'

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY

  const [searchResultMovie, setSearchResultMovie] = useState({ results: [] })
  const [searchResultTv, setSearchResultTv] = useState({ results: [] })
  const [searchResult, setSearchResult] = useState({})

  const [renderSearchResult, setRenderSearchResult] = useState()


  const [queryInput, setQueryInput] = useState('')

  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${queryInput}&language=it-IT`
  const API_URL_TV = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${queryInput}&language=it-IT`


  useEffect(() => {

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {

        setSearchResultMovie(data)

      })

    fetch(API_URL_TV)
      .then(res => res.json())
      .then(data => {

        setSearchResultTv(data)

      })

  }, [queryInput])



  useEffect(() => {

    setSearchResult({
      results: [
        ...searchResultTv.results,
        ...searchResultMovie.results
      ]
    })

  }, [searchResultTv, searchResultMovie])

  console.log(searchResult)




  function searchSubmit(e) {

    e.preventDefault()

    setRenderSearchResult(searchResult)

  }

  return (
    <>

      <form onSubmit={searchSubmit}>
        <input type="text" value={queryInput} onChange={(e) => setQueryInput(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <ul>
        {
          renderSearchResult?.results?.map(result => (
            <li key={result.id}>
              <ul>
                <li>Title: {result.title && result.title || result.name} { }</li>
                <li>Original Title: {result.original_title && result.original_title || result.original_name}</li>
                <li>Original Language: {result.original_language} <img src={`../public/lang/${result.original_language}.svg`} /></li>
                <li>Vote: {result.vote_average}</li>
              </ul>
            </li >
          ))
        }
      </ul >

    </>
  )
}

export default App
