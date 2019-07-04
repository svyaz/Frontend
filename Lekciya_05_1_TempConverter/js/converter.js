"use strict";

/* Constants */
var MIN_TEMPERATURE = -273.15;
var MAX_TEMPERATURE = 1.416808e32;
var MSG_UNACCEPTABLE_VALUE = "Unacceptable temperature value!";

document.addEventListener("DOMContentLoaded", function () {
    /* Data */
    var celsiusTemperature = 36.6;
    var fahrenheitTemperature = convertToFahrenheit(celsiusTemperature);
    var kelvinTemperature = convertToKelvin(celsiusTemperature);

    /* UI elements */
    var valueInput = document.getElementById("valueInput");
    var fahrenheitElement = document.getElementById("fahrenheitValue");
    var kelvinElement = document.getElementById("kelvinValue");
    var convertButton = document.getElementById("convertButton");
    
    /* Register event listener */
    convertButton.addEventListener("click", function (e) {
        var temp = parseFloat(valueInput.value);
        if (!validateValue(temp)) {
            alert(MSG_UNACCEPTABLE_VALUE);
            return;
        }

        celsiusTemperature = temp;
        fahrenheitTemperature = convertToFahrenheit(celsiusTemperature);
        kelvinTemperature = convertToKelvin(celsiusTemperature);
        setElement(fahrenheitTemperature, fahrenheitElement);
        setElement(kelvinTemperature, kelvinElement);
    });

    /* Set beginning value */
    setElement(fahrenheitTemperature, fahrenheitElement);
    setElement(kelvinTemperature, kelvinElement);
});

function validateValue(temperature) {
    if (isNaN(temperature)) {
        return false;
    }
    return temperature >= MIN_TEMPERATURE && temperature <= MAX_TEMPERATURE;
}

function convertToFahrenheit(temperature) {
    return temperature * 9.0 / 5.0 + 32;
}

function convertToKelvin(temperature) {
    return temperature + 273.15;
}

function setElement(temperature, element) {
    element.innerHTML = temperature;
}

//TODO округление вывода
//TODO почитать про MVC в JS.