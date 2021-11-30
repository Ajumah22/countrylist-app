import  { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { getAllCountries } from './requests'
import CountryList from './components/Countrylist'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryList, setCountryList] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentMode, setCurrentMode] = useState('light')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Search by region')

  const getRegions = () => {
    let regions = countries.map(country => country.region)
    let uniqueRegions = []
    for (let index = 0; index < regions.length; index++)
    if (!uniqueRegions.includes(regions[index])) {
      uniqueRegions.push(regions[index])
    }

      uniqueRegions.unshift('Search by region')
    
      return uniqueRegions
  }

  const handleSearch = (searchTerm) => {
    let newList = countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setCountryList(newList)
  }
  
  const handleFilter = (filter) => {
    let newList = countries.filter(country => country.region === filter)
    setCountryList(newList)
  }

const chooseOption = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    handleFilter(option)
  }
  
  useEffect(() => {
    getAllCountries().then(data => {
      setCountries(data)
      setCountryList(data)
      console.log(data);
      setLoading(false)
    })
  }, [])
  
  
  return (
    <div className={`App ${currentMode}`}>
      {loading && <h1>Loading...din...din...</h1>}
      <Navbar getCurrentMode={setCurrentMode}/>
      <main>
        <div className="top">
          <div id="search-area">
            <input type="text" placeholder="Search for a country..." onChange={(e) => handleSearch(e.target.value)} />
          </div>

          <div id="select-area">
            <button onClick={() => setIsOpen(!isOpen)}>{selectedOption}</button>
            {isOpen &&
              <ul>
                {
                  getRegions().map((region, index) => {
                    return (
                      <li key={index} onClick={() => chooseOption(region)}>{region}</li>
                    )
                    
                  })
                }
              </ul>
            }
          </div>
        </div>
        <CountryList list={countryList} />
      </main>
      
    </div>
  )
}
        export default App
        