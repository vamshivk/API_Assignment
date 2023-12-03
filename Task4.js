var currency1 = 'USD';
var currency2 = 'JPY';
var apiKey = 'b2e7978e1bb0e949bac1096f';

var apiUsdConversion = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency1}`;

var apiJpyConversion = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency2}`;

function usdConversion(data) {
    const usd = document.getElementById("usdconversion");
    var conversionRates = data.conversion_rates;
    if (conversionRates) {
        var EurConversion = conversionRates.EUR;
        var amountInUSD = 100;
        var amountInEUR = amountInUSD * EurConversion;
        usd.textContent = `${amountInUSD} ${currency1} = ${amountInEUR} EUR`;
    }
}

function jpyConversion(data) {
    const jpy = document.getElementById("jpyconversion");
    var conversionRates = data.conversion_rates;
    if (conversionRates) {
        var GbpConversion = conversionRates.GBP;
        var amountInJPY = 1000;
        var amountInGBP = amountInJPY * GbpConversion;
        jpy.textContent = `${amountInJPY} ${currency2} = ${amountInGBP} GBP`;
    }
}

fetch(apiUsdConversion)
    .then(response => response.json())
    .then(data => {
        if (data) {
            console.log(data);
            usdConversion(data);
        } else {
            console.log("No data available");
        }
    })
    .catch(error => {
        console.log("Fetch not successful:", error);
    });

    fetch(apiJpyConversion)
    .then(response => response.json())
    .then(data => {
        if (data) {
            console.log(data);
            jpyConversion(data);
        } else {
            console.log("No data available");
        }
    })
    .catch(error => {
        console.log("Fetch not successful:", error);
    });
