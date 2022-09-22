import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}


fetch('https://restcountries.com/v3.1/name/peru')
    .then(response => {
    return response.json();
    })
//     .then(countries => {
//     console.log(countries)
// })
    .then(renderCountryList)
    .catch(error => {
    console.log(error)
})

function renderCountryList(countries) {
  const markup = countries
    .map((country) => {
        return `<li>
      <svg><use href="${country.flags.svg}"></use>
            </svg>
          <p> ${country.name.common}</p>
         </li>`;
    })
        .join("");
    
  refs.countryList.innerHTML = markup;
}