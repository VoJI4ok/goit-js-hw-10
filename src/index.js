
import markupCountry from './templates/markupCountry.hbs';
import markupPreviewList from './templates/markupPreviewList.hbs';
import './css/styles.css';
import Notiflix from 'notiflix';
import {fetchCountries} from "./fetchCountries.js"
const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
// import debounce from 'lodash.debounce';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const coutnryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput (event) {
    if (event.target.value === "") {
        return;
    }
    fetchCountries(event.target.value.trim())
    .then(lengthChecking)
    .catch((error)=> {
        console.log(error);
        Notiflix.Notify.failure('Oops, there is no country with that name');
        clearList() 
    });
}
// function error(err) {
//         console.log(err);
//         Notiflix.Notify.failure('Oops, there is no country with that name');
//         clearList();
// }

function lengthChecking(countries) {
    clearList()
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        clearList();
    }
    if (countries.length >= 2 && countries.length <= 10) {
        insertCountriesList(countries.map(markupPreviewList));
    }
    if (countries.length === 1) {
        insertCountry(countries.map(markupCountry));
    }
}

function clearList() {
    countryList.innerHTML ='';
    coutnryInfo.innerHTML='';
}

function insertCountry(country) {
    coutnryInfo.insertAdjacentHTML('beforeend', country);
}

function insertCountriesList(list) {
    countryList.insertAdjacentHTML('beforeend', list.join(''));
}
