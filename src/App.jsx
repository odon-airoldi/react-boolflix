import { useState, useEffect } from 'react'

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY

  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=ritorno`

  const [movieSearchResult, setMovieSearchResult] = useState(null)

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {

        setMovieSearchResult(data)

      })

  }, [])

  // console.log(movieSearchResult)

  function searchSubmit(e) {

    e.preventDefault()

    console.log('submit form')

  }

  return (
    <>

      <form onSubmit={searchSubmit}>
        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        {searchInput}
        <button type="submit">Search</button>
      </form>

    </>
  )
}

export default App
