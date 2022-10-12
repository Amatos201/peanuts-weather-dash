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