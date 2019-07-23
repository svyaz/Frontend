"use strict";

document.addEventListener("DOMContentLoaded", function () {
    // People
    var people = [
        {
            name: "Lewis",
            lastName: "Hamilton",
            age: 44
        },
        {
            name: "Daniil",
            lastName: "Kvyat",
            age: 26
        },
        {
            name: "Pierre",
            lastName: "Gasly",
            age: 10
        },
        {
            name: "Charles",
            lastName: "Leclerc",
            age: 16
        },
        {
            name: "Carlos",
            lastName: "Sainz",
            age: 55
        },
        {
            name: "Nico",
            lastName: "Hulkenberg",
            age: 27
        },
        {
            name: "Robert",
            lastName: "Kubica",
            age: 88
        },
        {
            name: "Kimi",
            lastName: "Raikkonen",
            age: 7
        },
        {
            name: "Antonio",
            lastName: "Giovinazzi",
            age: 99
        },
        {
            name: "Max",
            lastName: "Verstappen",
            age: 33
        }
    ];

    // Task 1
    var averageAge = _.reduce(people, function (sum, person) {
        return sum + person.age;
    }, 0) / _.size(people);
    console.log("Средний возраст всех людей: " + averageAge);
    console.log("");

    // Task 2
    var peopleFrom20to30 = _.chain(people)
        .filter(function (person) {
            return person.age >= 20 && person.age <= 30;
        })
        .sortBy("age").value();
    console.log("Список людей с возрастом от 20 до 30 включительно, отсортированный по возрастанию возраста:");
    _.each(peopleFrom20to30, function (person) {
        console.log("  " + person.name + " " + person.lastName + ", " + person.age + " years old.");
    });
    console.log("");

    // Task 3
    var peopleWithFullName = _.map(people, function (person) {
        return _.extend(person, { fullName: person.name + " " + person.lastName });
    });
    console.log("Добавить всем людям поле fullName, которое состоит из фамилии и имени через пробел:");
    _.each(peopleWithFullName, function (person) {
        console.log("  " + person.fullName);
    });
});
