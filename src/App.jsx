import { useState, useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import AppHeader from './components/AppHeader'
import './app.css'

function App() {

  const API_KEY = import.meta.env.VITE_API_KEY

  const [searchResultMovie, setSearchResultMovie] = useState({ results: [] })
  const [searchResultTv, setSearchResultTv] = useState({ results: [] })
  const [searchResult, setSearchResult] = useState({})

  const [renderSearchResult, setRenderSearchResult] = useState()
  // const [voteAverage, setVoteAverage] = useState(0)


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


  // search form submit

  function searchSubmit(e) {

    e.preventDefault()

    setRenderSearchResult(searchResult)

  }

  // vote average

  function voteStar(vote) {

    const value = Math.ceil(vote / 2)
    let i = 0
    let stars = []

    while (i < value) {
      stars.push(i + 1)
      i++
    }

    return stars

  }



  return (
    <>

      <AppHeader searchSubmit={searchSubmit} queryInput={queryInput} setQueryInput={setQueryInput} />

      <section className="bg-dark">
        <div className="container py-5">
          <div className="row row-cols-4 g-1">
            {
              renderSearchResult?.results?.map(result => (
                <div key={result.id}>
                  <div className="bf-card position-relative">
                    <div className="bf-card-img">
                      {
                        result.poster_path &&
                        <img className="object-fit-cover w-100 h-100" src={`https://image.tmdb.org/t/p/w342/${result.poster_path}`} />
                        || <div></div>
                      }
                    </div>
                    <div className="bf-card-overlay position-absolute top-0 start-0 text-white w-100 h-100">
                      <div className="bf-card-body position-absolute bottom-0 p-3 w-100">
                        <h2 className="h5">{result.title && result.title || result.name}</h2>
                        <div>Original Title: {result.original_title && result.original_title || result.original_name}</div>
                        <div>Original Language: {result.original_language && <img src={`../public/lang/${result.original_language}.svg`} />}</div>
                        {result.vote_average !== 0 &&
                          <div className="d-flex"><span>Vote</span>
                            {
                              voteStar(result.vote_average).map((item, i) => (
                                <i key={i} className="bi bi-star-fill ms-1"></i>
                              ))
                            }
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

    </>
  )
}

export default App
