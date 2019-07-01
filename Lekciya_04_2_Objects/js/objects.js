"use strict";

/* Returns array of countries names. */
function getWithMaxCities(countries) {
    if (countries.length === 0) {
        return [];
    }

    var sorted = countries.slice(0).sort(function (e1, e2) {
        return e2.cities.length - e1.cities.length;
    });
    var maximum = sorted[0].cities.length;

    return sorted.filter(function (x) {
        return x.cities.length === maximum;
    }).map(function (x) {
        return x.name;
    });
}

/* Returns all countries information object. */
function getCountriesTotalPopulation(countries) {
    var tmp = countries.map(function (country) {
        var tmpName = country.name;
        var tmpTotal = country.cities.map(function (city) {
            return city.population;
        }).reduce(function (sum, current) {
            return sum + current;
        }, 0);

        return {
            name: tmpName,
            totalPopulation: tmpTotal
        };
    });

    return {countries: tmp};
}

var russia = {
    name: "Russia",
    cities: [
        {name: "Moscow", population: 8389200},
        {name: "Novosibirsk", population: 1398800},
        {name: "Tomsk", population: 482100}
    ]
};

var unitedKingdom = {
    name: "United Kingdom",
    cities: [
        {name: "London", population: 7285000},
        {name: "Peterborough", population: 156000},
        {name: "Liverpool", population: 461000}
    ]
};

var austria = {
    name: "Austria",
    cities: [
        {name: "Wien", population: 1608144},
        {name: "Innsbruck", population: 111752}
    ]
};

var chile = {
    name: "Chile",
    cities: [
        {name: "Santiago de Chile", population: 4703954},
        {name: "San Pedro de la Paz", population: 91684}
    ]
};

var countries = [russia, austria, chile, unitedKingdom];

console.log("Array of countries names with maximum cities number: " + getWithMaxCities(countries).join(", "));
console.log("Object of countries with name and total population: " + getCountriesTotalPopulation(countries));