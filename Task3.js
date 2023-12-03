var country = 'Brazil';
var apiUrl = `https://restcountries.com/v3.1/name/${country}`;

// Function to update the DOM with country information
function updateCountryInfo(countryData) {
    const areaElement = document.getElementById('area');
    const populationElement = document.getElementById('population');
    const languageElement = document.getElementById('language');

    if (countryData) {
        areaElement.textContent = countryData.area;
        populationElement.textContent = countryData.population;

        const languageObject = countryData.languages;
        const languageKeys = Object.keys(languageObject);
        const countryLanguage = languageKeys.length > 0 ? languageObject[languageKeys[0]] : 'N/A';
        languageElement.textContent = countryLanguage;
    } else {
        areaElement.textContent = 'N/A';
        populationElement.textContent = 'N/A';
        languageElement.textContent = 'N/A';
    }
}

var region = 'Africa';
var countryNamesElement = document.getElementById('countryNames');

// Function to update the DOM with country names in Africa
function updateCountryNames(countryNames) {
    if (countryNames.length > 0) {
        countryNames.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            countryNamesElement.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No countries found in that region';
        countryNamesElement.appendChild(li);
    }
}

// Fetch and update country information
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            updateCountryInfo(data[0]);
        } else {
            updateCountryInfo(null);
        }
    })
    .catch(error => {
        console.log('Fetching API error:', error);
        updateCountryInfo(null);
    });

// Fetch and update country names in Africa
fetch(`https://restcountries.com/v3.1/region/${region}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            const regionData = data;
            const countryNames = regionData.map(country => country.name.common);
            updateCountryNames(countryNames);
        } else {
            updateCountryNames([]);
        }
    })
    .catch(error => {
        console.log('Fetching API error:', error);
        updateCountryNames([]);
    });
