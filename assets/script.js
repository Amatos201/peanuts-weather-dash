var citiesListArr = [];
var numOfCities = 5;
var APIKey =  "appid=253f4c918a7866d5e2e78d48e99bb84d";
var WeatherApi =
  "https://api.openweathermap.org/data/2.5/weather?q=";
var dailyApiStarts = "https://api.openweathermap.org/data/2.5/uvi?";
var forecastApiStarts =
  "https://api.openweathermap.org/data/2.5/onecall?";

  var searchCityForm = $("#searchCityForm");
  var searchedCities = $("#searchedCity");

  var CityWeather = function (searchCityName) {

    var apiUrl =
    dailyApiStarts + searchCityName + "&" + APIKey + "&" + unit;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      return response.json().then(function (response) {
        $("#cityName").html(response.name);
        // display date
        var unixTime = response.dt;
        var date = moment.unix(unixTime).format("MM/DD/YY");
        $("#todaydate").html(date);
        // display weather icon
        var weatherIncoUrl =
          "http://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          "@2x.png";
        $("#weatherIconToday").attr("src", weatherIncoUrl);
        $("#tempToday").html(response.main.temp + " \u00B0F");
        $("#humidityToday").html(response.main.humidity + " %");
        $("#windSpeedToday").html(response.wind.speed + " MPH");
        // return coordinate for getUVIndex to call
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        getUVIndex(lat, lon);
        getForecast(lat, lon);
      });
    } else {
      alert("provide a valid city name please.");
    }
  });
};

var getForecast = function (lat, lon) {
  
  var apiUrl =
    forecastApiStarts +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=current,minutely,hourly" +
    "&" +
    APIKey +
    "&" +
    unit;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      for (var i = 1; i < 6; i++) {
       
        var unixTime = response.daily[i].dt;
        var date = moment.unix(unixTime).format("MM/DD/YY");
        $("#Date" + i).html(date);
        // weather icon
        var weatherIncoUrl =
          "http://openweathermap.org/img/wn/" +
          response.daily[i].weather[0].icon +
          "@2x.png";
        $("#weatherIconDay" + i).attr("src", weatherIncoUrl);
       //temp
        var temp = response.daily[i].temp.day + " \u00B0F";
        $("#tempDay" + i).html(temp);
       //humidity 
        var humidity = response.daily[i].humidity;
        $("#humidityDay" + i).html(humidity + " %");
      }
    });
};
var saveCityName = function (searchCityName) {
  var newcity = 0;
  citiesListArr = JSON.parse(localStorage.getItem("weatherInfo"));
  if (citiesListArr == null) {
    citiesListArr = [];
    citiesListArr.unshift(searchCityName);
  } else {
    for (var i = 0; i < citiesListArr.length; i++) {
      if (searchCityName.toLowerCase() == citiesListArr[i].toLowerCase()) {
        return newcity;
      }
    }
    if (citiesListArr.length < numOfCities) {
      // create object
      citiesListArr.unshift(searchCityName);
    } else {
      // control the length of the array. do not allow to save more than 10 cities
      citiesListArr.pop();
      citiesListArr.unshift(searchCityName);
    }
  }
  localStorage.setItem("weatherInfo", JSON.stringify(citiesListArr));
  newcity = 1;
  return newcity;


// creating city button for search
    var createCityBtn = function (searchCityName) {
      var saveCities = JSON.parse(localStorage.getItem("weatherInfo"));
      
      if (saveCities.length == 1) {
        var cityBtn = creatBtn(searchCityName);
        searchedCities.prepend(cityNameBtn);
      } else {
        for (var i = 1; i < saveCities.length; i++) {
          if (searchCityName.toLowerCase() == saveCities[i].toLowerCase()) {
            return;
          }
        }
        


        loadSavedCity();

    var formSubmitHandler = function (event) {
      event.preventDefault();
      // name of the city
      var searchCityName = $("#searchCity").val().trim();
      var newcity = saveCityName(searchCityName);
      CityWeather(searchCityName);
      if (newcity == 1) {
        createCityBtn(searchCityName);
      }
    };
    var BtnClickHandler = function (event) {
      event.preventDefault();
      // name of the city
      var searchCityName = event.target.textContent.trim();
      CityWeather(searchCityName);
    };








    $("#searchCityForm").on("submit", function () {
      formSubmitHandler(event);
    });
    $(":button.list-group-item-action").on("click", function () {
      BtnClickHandler(event);
    });