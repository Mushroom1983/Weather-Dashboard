var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var apiKey = "a67dededc95f92bf05c1b3a0e3e9c121";
var historyList = $("#history");

$("#search-button").on("click", function (event) {
  event.preventDefault();

  if (searchInput.value === "" || searchInput.value === null) {
    return;
  }

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    searchInput.value +
    "&appid=" +
    apiKey;

  $("#history").append(
    "<button class='btn btn-secondary history-button'>" +
      searchInput.value +
      "</button> "
  );
  searchInput.value = "";

  var buttonCount = $(".history-button").length;

  // Limit the number of buttons to 6
  if (buttonCount >= 8) {
    // Remove the oldest button
    $(".history-button:first").remove();
  }

  // if a button is pressed search for that city
  $(".history-button").on("click", function () {
    var city = $(this).text();
    queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&" +
      "appid=" +
      apiKey;

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.weather && data.weather.length > 0) {
          var today = dayjs().format("DD MM, YYYY");
          var iconCode = data.weather[0].icon;
          var iconUrl =
            "https://openweathermap.org/img/w/" + iconCode + ".png";

          $("#today").empty(); // Clear previous content
          $("#today").append(
            "<h1>" +
              data.name +
              " " +
              today +
              "<img src='" +
              iconUrl +
              "'>" +
              "</h1>"
          );

          $("#today").append("<p>Temp:" + data.main.temp + "</p>");
          $("#today").append("<p>Wind:" + data.wind.speed + "</p>");
          $("#today").append("<p>Humidity:" + data.main.humidity + "</p>");

          console.log(data);

          $("#forecast").empty();
          $("#forecast").append("<h1>" + "5 Day Forecast" + "</h1>");

          const forecast =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&" +
            "appid=" +
            apiKey;

          return fetch(forecast);
        } else {
          console.log("Invalid response data format");
        }
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (forecastData) {
        const list = forecastData.list;

        for (let i = 7; i < list.length; i += 8) {
          const { dt_txt, weather, main, wind } = list[i];
          const date = dt_txt.split(" ")[0].replace(/-/g, "/");
          const revDate = reverseDate(date); 
          const temp = main.temp;
          const celcius = temp - 273.15;
          const iconCode = weather[0].icon;
          const iconUrl =
            "https://openweathermap.org/img/w/" + iconCode + ".png";

          var cardHtml =
            "<div class='card'>" +
            "<div class='card-body'>" +
            "<h5 class='card-title'>" +
            "Date" +
            revDate + // Use revDate instead of data.dt
            "<img src='" +
            iconUrl +
            "'>" +
            "</h5>" +
            "<p class='card-text'>" +
            "Temp" +
            celcius + // Use celcius instead of data.main.temp
            "</p>" +
            "<p class='card-text'>" +
            "Wind" +
            wind.speed + // Use wind.speed instead of data.wind.speed
            "</p>" +
            "<p class='card-text'>" +
            "Humidity" +
            main.humidity + // Use main.humidity instead of data.main.humidity
            "</p>" +
            "</div>" +
            "</div>";

          $("#forecast").append(cardHtml);
          $(".card").css("width", "18%");
          $(".card").css("margin", "2px");
          $(".card").css("background-color", "darkgray");
        }
      })
      .catch(function (error) {
        console.log("Error fetching forecast data:", error);
      });
  });
});

function reverseDate(date) {
  const [year, month, day] = date.split("/");
  return day + "/" + month + "/" + year;
}
