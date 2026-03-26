import { useState, useEffect } from 'react'

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY

  const [renderSearchResult, setRenderSearchResult] = useState('')

  const [searchResultMovie, setSearchResultMovie] = useState(null)
  const [searchResultTv, setSearchResultTv] = useState(null)

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

  console.log(searchResultTv)




  function searchSubmit(e) {

    e.preventDefault()
    setRenderSearchResult({ ...searchResultTv, searchResultMovie })

  }
  // console.log(renderSearchResult)

  return (
    <>

      <form onSubmit={searchSubmit}>
        <input type="text" value={queryInput} onChange={(e) => setQueryInput(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <ul>
        {
          renderSearchResult?.results?.map(movie => (
            <li key={movie.id}>
              <ul>
                <li>Movie: {movie.title}</li>
                <li>Original Title: {movie.original_title}</li>
                <li>Original Language: {movie.original_language} <img src={`../public/lang/${movie.original_language}.svg`} /></li>
                <li>Vote: {movie.vote_average}</li>
              </ul>
            </li >
          ))
        }
      </ul >

    </>
  )
}

export default App
