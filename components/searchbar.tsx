import { useEffect, useState } from "react";
import SearchData from "../types/searchdata";
import SearchTerm from "../types/searchterms";

interface ISearchBarProps {
    searchTerms: SearchTerm,
    setSearchTerms: (searchTerms: SearchTerm) => void,
    searchData: SearchData
}

const SearchBar: React.FC<ISearchBarProps> = ({ searchTerms, setSearchTerms, searchData }) => {
    const [name, setName] = useState(searchTerms.name)
    const [nameList, setNameList] = useState(null)
    const [city, setCity] = useState(searchTerms.city)
    const [cityList, setCityList] = useState(null)
    const [iata, setIata] = useState(searchTerms.iata)
    const [iataList, setIataList] = useState(null)
    const [country, setCountry] = useState(searchTerms.country)
    const [countryList, setCountryList] = useState(null)

    const updateSearchTerm = () => {
        const updatedSearchTerm = {
            name: name,
            city: city,
            iata: iata,
            country: country
        }
        setSearchTerms(updatedSearchTerm);
    }

    const updateName = (e: any) => {
        setName(e.target.textContent);
        setNameList(null);
    }

    const updateCity = (e: any) => {
        setCity(e.target.textContent);
        setCityList(null);
    }

    const updateIata = (e: any) => {
        setIata(e.target.textContent);
        setIataList(null);
    }

    const updateCountry = (e: any) => {
        setCountry(e.target.textContent);
        setCountryList(null);
    }

    const nameFocus = () => {
        setCityList(null);
        setIataList(null);
        setCountryList(null);
    }

    const cityFocus = () => {
        setNameList(null);
        setIataList(null);
        setCountryList(null);
    }

    const iataFocus = () => {
        setCityList(null);
        setNameList(null);
        setCountryList(null);
    }

    const countryFocus = () => {
        setCityList(null);
        setIataList(null);
        setNameList(null);
    }

    useEffect(() => {
        const tempNameList = searchData.names.map((nameItem) => {
            if (nameItem.toLowerCase().startsWith(name.toLowerCase()) && name != "") {
                return (<li className="p-2 pl-4 pr-4 border-b border-l border-r cursor-pointer hover:bg-gray-100" key={nameItem} onClick={updateName}>{nameItem}</li>);
            }
        })
        if (!searchData.names.includes(name)) {
            setNameList(tempNameList);
        }
        if (name == "") {
            setNameList(null);
        }
    }, [name, searchData])

    useEffect(() => {
        const tempCityList = searchData.cities.map((cityItem) => {
            if (cityItem.toLowerCase().startsWith(city.toLowerCase()) && city != "") {
                return (<li className="p-2 pl-4 pr-4 border-b border-l border-r cursor-pointer hover:bg-gray-100" key={cityItem} onClick={updateCity}>{cityItem}</li>);
            }
        })
        if (!searchData.cities.includes(city)) {
            setCityList(tempCityList);
        }
        if (city == "") {
            setCityList(null);
        }
    }, [city, searchData])

    useEffect(() => {
        const tempIataList = searchData.iatas.map((iataItem) => {
            if (iataItem.toLowerCase().startsWith(iata.toLowerCase()) && iata != "") {
                return (<li className="p-2 pl-4 pr-4 border-b border-l border-r cursor-pointer hover:bg-gray-100" key={iataItem} onClick={updateIata}>{iataItem}</li>);
            }
        })
        if (!searchData.iatas.includes(iata)) {
            setIataList(tempIataList);
        }
        if (iata == "") {
            setIataList(null);
        }
    }, [iata, searchData])

    useEffect(() => {
        const tempCountryList = searchData.countries.map((countryItem) => {
            if (countryItem.toLowerCase().startsWith(country.toLowerCase()) && country != "") {
                return (<li className="p-2 pl-4 pr-4 border-b border-l border-r cursor-pointer hover:bg-gray-100 " key={countryItem} onClick={updateCountry}>{countryItem}</li>);
            }
        })
        if (!searchData.countries.includes(country)) {
            setCountryList(tempCountryList);
        }
        if (country == "") {
            setCountryList(null);
        }
    }, [country, searchData])

    return (
        <div className="mt-5">
            <div className="relative">
                <span className="w-auto black text-xs font-bold">Airport Name</span>
                <div className="bg-white rounded w-full">
                    <input className="w-full p-2 pl-4 pr-4 rounded-t border focus:outline-none" type="text" placeholder="Narita Airport" value={name} onFocus={nameFocus} onChange={e => setName(e.target.value)} />
                    <ul className="bg-white z-30 text-gray-700 w-full max-h-60 h-auto overflow-auto absolute border-b">
                        {nameList}
                    </ul>
                </div>
            </div>

            <div className="flex">
                <div className="relative w-7/12">
                    <span className="black text-xs font-bold">City</span>
                    <div className="bg-white rounded w-full">
                        <input className="w-full p-2 pl-4 pr-4 rounded-t border focus:outline-none" type="text" placeholder="Tokyo" value={city} onFocus={cityFocus} onChange={e => setCity(e.target.value)} />
                        <ul className="bg-white z-20 text-gray-700 w-full max-h-60 h-auto overflow-auto absolute border-b">
                            {cityList}
                        </ul>
                    </div>
                </div>
                <div className="relative w-5/12 ml-1">
                    <span className="black text-xs font-bold">IATA</span>
                    <div className="bg-white rounded w-full">
                        <input className="w-full p-2 pl-4 pr-4 rounded-t border focus:outline-none" type="text" placeholder="NRT" value={iata} onFocus={iataFocus} onChange={e => setIata(e.target.value)} />
                        <ul className="bg-white z-10 text-gray-700 w-full max-h-60 h-auto overflow-auto absolute border-b">
                            {iataList}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="relative w-7/12">
                    <span className="w-auto black text-xs font-bold">Country</span>
                    <div className="bg-white rounded w-full">
                        <input className="w-full p-2 pl-4 pr-4 rounded-t border focus:outline-none" type="text" placeholder="Japan" value={country} onFocus={countryFocus} onChange={e => setCountry(e.target.value)} />
                        <ul className="bg-white z-10 text-gray-700 w-full max-h-60 h-auto overflow-auto absolute border-b">
                            {countryList}
                        </ul>
                    </div>
                </div>
                <button className="bg-blue-500 w-5/12 hover:bg-blue-400 focus:outline-none rounded text-white ml-1 mt-6 p-2 pl-4 pr-4" onClick={updateSearchTerm}>
                    <p className="text-s">Search</p>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;