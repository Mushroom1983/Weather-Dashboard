var searchForm = document.querySelector("#search-form");

var searchInput = document.querySelector("#search-input");

var apiKey = "a67dededc95f92bf05c1b3a0e3e9c121"

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ searchInput + "&" + "appid="+ apiKey;

$("#search-button").on("click", function(event){
    event.preventDefault();
    
    console.log(searchInput.value);

    if (searchInput.value === "" || searchInput.value === null) {
        return;
    }
})

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ searchInput + "&" + "appid="+ apiKey;

$("#history").append("<button>" + searchInput.value + "</button>");

console.log(queryURL); // This is for testing purposes.

$("#history-button").on("click", function() {
    var today = day.js().format("DD/MM/YYYY");
    var iconData = $(this).attr("data-icon");
    var iconURL = "https://openweathermap.org/img/wn/" + iconData + "@2x.png";
    var tempData = $(this).attr("data-temp");
    var humidityData = $(this).attr("data-humidity");
    var windData = $(this).attr("data-wind");
    var uvData = $(this).attr("data-uv");
})

fetch(queryURL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);

        if (data.cod === 404) {
            $("#today").text("City not found. Please try again.");
            return;
        }
    })
