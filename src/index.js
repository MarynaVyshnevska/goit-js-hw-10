import './css/styles.css';
import fetchCountries from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1';


const refs = {
    inputSearch: document.querySelector('#search-box'),
    listCountry: document.querySelector('.country-list'),
    infoCountry: document.querySelector('.country-info'),
};

refs.inputSearch.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY))

function onInputSearch(evt) {
    const qeury = evt.target.value;
    // console.log(qeury);

    // Если поиск не заполнен, то вывода нет (обнуляем любой поиск)
    if (!qeury) {
        refs.listCountry.innerHTML = '';
        refs.infoCountry.innerHTML = '';
        return
    }
    
    fetchCountries(qeury)
        .then(data => {
            // console.log(data);// array of search
            if (!data) {
                refs.listCountry.innerHTML = '';
                refs.infoCountry.innerHTML = '';
                return
            }
            // console.log(data.length); // кол-во стран в массиве поиска
            
            if (data.length > 10) {// вівод сообщения о большом ко-ве найденніх стран
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            }

            if (data.length > 1 && data.length < 10) {
                createCountryList(data);
                return;
            }
            
            if (data.length > 0) {
                // console.log("I'm here")
                createCountryInfo(data);
                return;
            }
        });
    
}


function createCountryInfo(country) {
    // console.log("I'm here too")
    // console.log(country);
    const markup = country
        .map(({ name, capital, population, flags, languages }) => {
            const lang = Object.values(languages).join(','); // create array languages
            return `
                <li>
                    <div>
                        <img src="${flags.svg}" alt="${name.official}">
                        <h1>${name.official}</h1>
                    </div>
                    <p>Capital of ${name.official} is <b>${capital}</b></p>
                    <p>Population is <b>${population}</b> people</p>
                    <p>Language is <b>${lang}</b></p>
                </li>
            `;
        });
    refs.listCountry.innerHTML = "";
    refs.infoCountry.innerHTML = markup;
}


function createCountryList(countries) {
    const markup = countries
        .map(({ name: { official }, flags: { svg } }) => {
            return `
                <li class="country-list-item">
                    <img src="${svg}" alt="${official}">
                    <p>${official}</p>
                </li>
            `;
        })
        .join("");
    refs.listCountry.innerHTML = markup;
    refs.infoCountry.innerHTML = "";
}


// Object country
// let land = {
//     "name": {
//         "common": "Peru" ,
//         "official": "Republic of Peru",
//         "nativeName": {
//             "aym": {
//                 "official": "Piruw Suyu",
//                 "common": "Piruw"
//             },
//             "que": {
//                 "official": "Piruw Ripuwlika",
//                 "common": "Piruw"
//             },
//             "spa": {
//                 "official": "República del Perú",
//                 "common": "Perú"
//             }
//         }
//     },
//     "tld": [
//         ".pe"
//     ],
//     "cca2": "PE",
//     "ccn3": "604",
//     "cca3": "PER",
//     "cioc": "PER",
//     "independent": true,
//     "status": "officially-assigned",
//     "unMember": true,
//     "currencies": {
//         "PEN": {
//             "name": "Peruvian sol",
//             "symbol": "S/ "
//         }
//     },
//     "idd": {
//         "root": "+5",
//         "suffixes": [
//             "1"
//         ]
//     },
//     "capital": [
//         "Lima"
//     ],
//     "altSpellings": [
//         "PE",
//         "Republic of Peru",
//         "República del Perú"
//     ],
//     "region": "Americas",
//     "subregion": "South America",
//     "languages": {
//         "aym": "Aymara",
//         "que": "Quechua",
//         "spa": "Spanish"
//     },
//     "translations": {
//         "ara": {
//             "official": "جمهورية بيرو",
//             "common": "بيرو"
//         },
//         "bre": {
//             "official": "Republik Perou",
//             "common": "Perou"
//         },
//         "ces": {
//             "official": "Peruánská republika",
//             "common": "Peru"
//         },
//         "cym": {
//             "official": "Republic of Peru",
//             "common": "Peru"
//         },
//         "deu": {
//             "official": "Republik Peru",
//             "common": "Peru"
//         },
//         "est": {
//             "official": "Peruu Vabariik",
//             "common": "Peruu"
//         },
//         "fin": {
//             "official": "Perun tasavalta",
//             "common": "Peru"
//         },
//         "fra": {
//             "official": "République du Pérou",
//             "common": "Pérou"
//         },
//         "hrv": {
//             "official": "Republika Peru",
//             "common": "Peru"
//         },
//         "hun": {
//             "official": "Perui Köztársaság",
//             "common": "Peru"
//         },
//         "ita": {
//             "official": "Repubblica del Perù",
//             "common": "Perù"
//         },
//         "jpn": {
//             "official": "ペルー共和国",
//             "common": "ペルー"
//         },
//         "kor": {
//             "official": "페루 공화국",
//             "common": "페루"
//         },
//         "nld": {
//             "official": "Republiek Peru",
//             "common": "Peru"
//         },
//         "per": {
//             "official": "جمهوری پرو",
//             "common": "پرو"
//         },
//         "pol": {
//             "official": "Republika Peru",
//             "common": "Peru"
//         },
//         "por": {
//             "official": "República do Peru",
//             "common": "Perú"
//         },
//         "rus": {
//             "official": "Республика Перу",
//             "common": "Перу"
//         },
//         "slk": {
//             "official": "Peruánska republika",
//             "common": "Peru"
//         },
//         "spa": {
//             "official": "República de Perú",
//             "common": "Perú"
//         },
//         "swe": {
//             "official": "Republiken Peru",
//             "common": "Peru"
//         },
//         "tur": {
//             "official": "Peru Cumhuriyeti",
//             "common": "Peru"
//         },
//         "urd": {
//             "official": "جمہوریہ پیرو",
//             "common": "پیرو"
//         },
//         "zho": {
//             "official": "秘鲁共和国",
//             "common": "秘鲁"
//         }
//     },
//     "latlng": [
//         -10,
//         -76
//     ],
//     "landlocked": false,
//     "borders": [
//         "BOL",
//         "BRA",
//         "CHL",
//         "COL",
//         "ECU"
//     ],
//     "area": 1285216,
//     "demonyms": {
//         "eng": {
//             "f": "Peruvian",
//             "m": "Peruvian"
//         },
//         "fra": {
//             "f": "Péruvienne",
//             "m": "Péruvien"
//         }
//     },
//     "flag": "🇵🇪",
//     "maps": {
//         "googleMaps": "https://goo.gl/maps/uDWEUaXNcZTng1fP6",
//         "openStreetMaps": "https://www.openstreetmap.org/relation/288247"
//     },
//     "population": 32971846,
//     "gini": {
//         "2019": 41.5
//     },
//     "fifa": "PER",
//     "car": {
//         "signs": [
//             "PE"
//         ],
//         "side": "right"
//     },
//     "timezones": [
//         "UTC-05:00"
//     ],
//     "continents": [
//         "South America"
//     ],
//     "flags": {
//         "png": "https://flagcdn.com/w320/pe.png",
//         "svg": "https://flagcdn.com/pe.svg"
//     },
//     "coatOfArms": {
//         "png": "https://mainfacts.com/media/images/coats_of_arms/pe.png",
//         "svg": "https://mainfacts.com/media/images/coats_of_arms/pe.svg"
//     },
//     "startOfWeek": "monday",
//     "capitalInfo": {
//         "latlng": [
//             -12.05,
//             -77.05
//         ]
//     },
//     "postalCode": {
//         "format": "#####",
//         "regex": "^(\\d{5})$"
//     }
// }
