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

  console.log(renderSearchResult)

  return (
    <>

      <form onSubmit={searchSubmit}>
        <input type="text" value={queryInput} onChange={(e) => setQueryInput(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      <div>
        {
          renderSearchResult?.results?.map(movie => (
            <div key={movie.id}>
              {movie.title} - {movie.original_title} - {movie.original_language} - {movie.vote_average}
            </div>
          ))
        }
      </div>

    </>
  )
}

export default App
