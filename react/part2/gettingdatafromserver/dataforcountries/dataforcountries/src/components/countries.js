import React from "react";
import Country from './country'

const Countries = ({filter, countries, showCountry}) => {

    //array of countries whose names contain substring of "filter" variable e.g. if filter was "sw", countriesFiltered would contain information about countries that have "sw" in their name.
    const countriesFiltered = countries.filter(element =>
        element.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    if (countriesFiltered.length === countries.length || countriesFiltered.length === 0) return (<div></div>)
    
    //single filtered country gets rendered using Country component, passing in the single country object in the countriesFiltered array as the props
    else if (countriesFiltered.length === 1){
        return(
            <Country country={countriesFiltered[0]} />
        )
    }
    //takes the countriesFiltered array of objects and maps each element to be its own li with a button when clicked, changes the userinput value to be whatever the name of the corresponding country is
    else if(countriesFiltered.length <= 10 && countriesFiltered.length > 1){
        return(
                <ul>
                    {countriesFiltered.map((element,index) => 
                    <li key={index}>
                    {element.name.common}
                    <button type='button' value={element.name.common} onClick={showCountry}>show</button>
                    </li>)}
                </ul>
              )
    }
    else{
        return(
            <div>
                Too Many Matches
            </div>
        )
    }
}

export default Countries