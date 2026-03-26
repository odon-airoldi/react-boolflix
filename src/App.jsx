import { useState, useEffect } from 'react'

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY

  const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=ritorno`

  const [movieSearchResult, setMovieSearchResult] = useState()


  useEffect(() => {

    fetch(API_URL)
      .then(res => res.json())
      .then(data => {

        setMovieSearchResult(data)

      })

  }, [])

  console.log(movieSearchResult)

  return (
    <>

      <form>
        <input type="text" />
        <button type="submit">Search</button>
      </form>

    </>
  )
}

export default App
