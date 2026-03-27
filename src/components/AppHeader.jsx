export default function AppHeader({ searchSubmit, queryInput, setQueryInput }) {

    return (

        <header>
            <nav className="navbar bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <a className="navbar-brand text-uppercase">Boolfix</a>
                    <form className="d-flex" role="search" onSubmit={searchSubmit}>
                        <input className="form-control me-2" type="search" value={queryInput} onChange={(e) => setQueryInput(e.target.value)} />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </header>

    )

}