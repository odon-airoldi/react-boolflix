import { useState, useEffect } from 'react'

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY

  const [renderSearchResult, setRenderSearchResult] = useState('')

  const [searchResult, setSearchResult] = useState(null)

  const [queryInput, setQueryInput] = useState('')

  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${queryInput}`


  useEffect(() => {

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {

        setSearchResult(data)

      })

  }, [queryInput])
  // console.log(movieSearchResult)




  function searchSubmit(e) {

    e.preventDefault()
    setRenderSearchResult(searchResult)

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
                <li>Original Language: {movie.original_language}</li>
                <li>Vote: {movie.vote_average}</li>
              </ul>
            </li>
          ))
        }
      </ul>

    </>
  )
}

export default App
