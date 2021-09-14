import { NextPage } from 'next'
import Link from 'next/link'

import Layout from '../components/layout'
import useApiData from '../hooks/use-api-data'
import Airport from '../types/airport'
import SearchBar from '../components/searchbar'
import { useEffect, useState } from 'react'
import SearchTerm from '../types/searchterms'
import SearchData from '../types/searchdata'

const Page: NextPage = () => {
  const INTIAL_SEARCH_TERM: SearchTerm = { name: "", iata: "", city: "", country: "" }
  const INITIAL_SEARCH_DATA: SearchData = { names: [], countries: [], iatas: [], cities: [] }
  const airports = useApiData<Airport[]>('/api/airports', [])
  const [searchTerms, setSearchTerms] = useState(INTIAL_SEARCH_TERM)
  const [searchData, setSearchData] = useState(INITIAL_SEARCH_DATA)

  useEffect(() => {
    let namesArr = new Set<string>();
    let countriesArr = new Set<string>();
    let iatasArr = new Set<string>();
    let citiesArr = new Set<string>();

    airports.map((airport) => {
      namesArr.add(airport.name);
      countriesArr.add(airport.country);
      iatasArr.add(airport.iata);
      citiesArr.add(airport.city);
    })

    const calculatedSearchData = {
      names: Array.from(namesArr).sort(),
      countries: Array.from(countriesArr).sort(),
      iatas: Array.from(iatasArr).sort(),
      cities: Array.from(citiesArr).sort(),
    }

    setSearchData({ ...searchData, ...calculatedSearchData });
  }, [airports]);

  const getAirportList = airports.map((airport) => {
    if ((searchTerms.country == "" ? true : airport.country == searchTerms.country) &&
      (searchTerms.name == "" ? true : airport.name == searchTerms.name) &&
      (searchTerms.city == "" ? true : airport.city == searchTerms.city) &&
      (searchTerms.iata == "" ? true : airport.iata == searchTerms.iata)) {
      return (
        <Link href={`/airports/${airport.iata.toLowerCase()}`} key={airport.iata}>
          <a className='flex items-center p-5 mt-5 text-gray-800 border border-gray-200 rounded-lg shadow-sm hover:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:outline-none'>
            <span>
              {airport.name}, {airport.city}
            </span>
            <span className='ml-auto text-gray-500'>
              {airport.country}
            </span>
          </a>
        </Link>
      )
    }
  })

  return (
    <Layout>
      <h1 className='text-2xl font-bold'>Code Challenge: Airports</h1>
      <SearchBar searchTerms={searchTerms} setSearchTerms={setSearchTerms} searchData={searchData} />
      <h2 className="mt-10 text-xl font-semibold">Airports</h2>
      <div>
        {getAirportList}
      </div>
    </Layout>
  )
}

export default Page
