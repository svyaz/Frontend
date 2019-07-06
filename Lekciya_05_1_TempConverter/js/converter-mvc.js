"use strict";

var TemperatureClass = function () {
    var MIN_TEMPERATURE = -273.15;
    var MAX_TEMPERATURE = 1.416808e32;
    this.celsiusTemp = 0;
    this.fahrenheitTemp = 0;
    this.kelvinTemp = 0;

    this.setTemp = function (temp) {
        if (!validateValue(temp)) {
            return false;
        }
        this.celsiusTemp = temp;
        this.fahrenheitTemp = this.celsiusTemp * 9.0 / 5.0 + 32;
        this.kelvinTemp = this.celsiusTemp + 273.15;
        return true;
    };

    function validateValue (temp) {
        if (isNaN(temp)) {
            return false;
        }
        return temp >= MIN_TEMPERATURE && temp <= MAX_TEMPERATURE;
    }
};

var ViewClass = function () {
    ViewClass.MSG_UNACCEPTABLE_VALUE = "Unacceptable temperature value!";
    var valueInput = document.getElementById("valueInput");
    var fahrenheitElement = document.getElementById("fahrenheitValue");
    var kelvinElement = document.getElementById("kelvinValue");
    var convertButton = document.getElementById("convertButton");

    this.registerListener = function(controller) {
        convertButton.addEventListener("click", function () {
            controller.tempChanged(parseFloat(valueInput.value));
        });
    };

    /* Updates view */
    this.update = function (fahrenheitTemp, kelvinTemp) {
        fahrenheitElement.innerHTML = round(fahrenheitTemp);
        kelvinElement.innerHTML = round(kelvinTemp);
    };

    /* Shows alert */
    ViewClass.showMessage = function (message) {
        alert(message);
    };

    /* Rounds values */
    function round(number) {
        var numberParts = number.toString().split('e');
        if (numberParts.length === 1) {
            return (Math.round(number * 100) / 100).toString();
        }

        return (Math.round(parseFloat(numberParts[0]) * 100) / 100).toString() +
            'e' +
            numberParts[1].toString();
    }
};

var ControllerClass = function (temp, view) {
    this.temperature = temp;
    this.view = view;
    this.view.registerListener(this);

    this.tempChanged = function (temp) {
        if (!this.temperature.setTemp(temp)) {
            ViewClass.showMessage(ViewClass.MSG_UNACCEPTABLE_VALUE);
            return;
        }
        this.view.update(this.temperature.fahrenheitTemp, this.temperature.kelvinTemp);
    };
};

document.addEventListener("DOMContentLoaded", function () {
    var temperature = new TemperatureClass();
    var view = new ViewClass();
    var controller = new ControllerClass(temperature, view);
    controller.tempChanged(36.6);
});