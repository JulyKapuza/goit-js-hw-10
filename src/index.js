import './css/styles.css';
import {fetchCountries} from './fetchCountries'

import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';




const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}


refs.searchBox.addEventListener('input',  debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();

    const serchQuery = refs.searchBox.value;

    if (serchQuery === '' || serchQuery === ' ' ) {
         return Notiflix.Notify.warning('Please enter a word');
                 
     }

    fetchCountries(serchQuery.trim())
        .then(countries => {

            refs.countryList.innerHTML = '';
            refs.countryInfo.innerHTML = '';
            
            let numberOfCountries = countries.length;
            console.log(numberOfCountries)
            


             if (numberOfCountries > 10) {

                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');

            } else if (numberOfCountries >= 2 && numberOfCountries <= 10) {

                renderCountryList(countries)
                refs.countryInfo.innerHTML = '';

            } else if (numberOfCountries === 1) {

                renderCountryInfo(countries);
             } 
        })
            
    .catch(onFetchError)

};



function renderCountryList(countries) {
    const markupInfo = countries
    .map((country) => {
        return `<li class="item">
       <img class="icon" width = "30" 
                src="${country.flags.svg}"/>
        <p> ${country.name.official}</p>
         
         </li>`;
    })
        .join("");
    
  refs.countryList.innerHTML = markupInfo;
};

function renderCountryInfo(countries) {
  const markup = countries
    .map(({name, flags, capital,population, languages }) => {
        return `<li >
        <div class ="country-info_container">
         <img class="icon"
                src="${flags.svg}" width ="70"/>
       <h1><b>${name.official}</b></h1>
        </div>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${Object.values(languages).join(', ')}</p>
        
         </li>`;
    })
        .join("");
    
  refs.countryInfo.innerHTML = markup;
};




function onFetchError(error) {
     
     Notiflix.Notify.failure('Oops, there is no country with that name');
    refs.countryList.innerHTML = '';
     refs.countryInfo.innerHTML = ''; 
  

};
    