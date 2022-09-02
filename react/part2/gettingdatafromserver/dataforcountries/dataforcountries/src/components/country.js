import React from "react";

//takes a single country object and renders specific data
const Country = ({country}) => {
      return(
        <div>
			<h1>
				{country.name.common}
			</h1>
			
			<p>
				Capital: {country.capital}
			</p>
			
			<p>
				Area: {country.area}
			</p>
			
			Languages: 
			
			<ul>
				{Object.values(country.languages).map((element,index) => <li key={index}>{element}</li>)}
			</ul>

			<h3>
				Flag
			</h3>
			
			<img src={country.flags.png} alt='flag'>

			</img>
		</div>
      )
  }

export default Country