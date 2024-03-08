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