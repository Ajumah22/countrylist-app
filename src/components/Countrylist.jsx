const Countrylist = ({ list }) => {
  return (
    <div className="country-list">
          {
            list?.length ?
            (
              list.map(country => {
                return (
                  <div className="country-card" key={country.name}>
                    <figure>
                      <img src={country.flag} alt={country.name} />
                    </figure>
                    <div className="details">
                      <h3>{country.name}</h3>
                      <p>
                        <span>Population: </span>
                        <span>{country.population}</span>
                      </p>
                      <p>
                        <span>Region: </span>
                        <span>{country.region}</span>
                      </p>
                      <p>
                        <span>Capital: </span>
                        <span>{country.capital}</span>
                      </p>
                    </div>
                  </div>
                )
              })
            ) :
            (
              <div className="no-content">
              <h1>Oops!</h1>
              <p>We couldn't find any country</p>
              </div>
            )
          }
        </div>
  )
}

export default Countrylist
