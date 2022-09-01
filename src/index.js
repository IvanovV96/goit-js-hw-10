import './css/styles.css';
import debounce from 'lodash.debounce'
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';
const DEBOUNCE_DELAY = 300;

const inputText = document.getElementById('search-box')
const countryList = document.querySelector('.country-list')

    
inputText.addEventListener('input', debounce(() => {
    fetchCountries(inputText.value.trim()).then(data => {
        if(inputText.value === '') {
            removeMarkup()
            return 
        }
        if(data.length > 10) {
            Notify.info("Too many matches found. Please enter a more specific name.")
        } else if(data.length > 2 && data.length <= 10) {
            removeMarkup()
            renderMarkup(data)
        } else if(data.length === 1) {
            removeMarkup()
            renderOneCountryMarkup(data)
        }
    })
}, DEBOUNCE_DELAY))

function renderMarkup(data) {
    data.forEach(country => {
        const markup = `<li class = 'country-item'>
    <img src="${country.flags.svg}" alt="${country.name.common}"></img>
    <span>${country.name.official}</span>
    </li>`
        countryList.insertAdjacentHTML('beforeend', markup)
    })
}

function renderOneCountryMarkup(data) {  
   data.forEach(country => {
    const langs = Object.values(country.languages).join(',')
    const markup = `<li class = 'country-card'>
    <div class = 'wrapper'>
        <img  src="${country.flags.svg}" alt=""></img>
        <h2>${country.name.official}</h2>
    </div>
    <p><b>Capital:</b> ${country.capital}</p>
    <p><b>Population:</b> ${country.population}</p>
    <p><b>Languages:</b> ${langs}</p>
    </li>`
    countryList.insertAdjacentHTML('beforeend', markup)
   })
}

function removeMarkup() {
    countryList.innerHTML = ''
}

