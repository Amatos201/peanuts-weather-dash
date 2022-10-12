var citiesListArr = [];
var numOfCities = 5;


var searchbutton = $("#search-button");
var apiKey = "d899707429dae12637678613a5874634";
var searchinput = "";
var date = moment().format("MM/DD/YY");
var currentDate = moment().format("M/D/YYYY");
var cityName = "";

  searchbutton.click(function(){ 
    console.log("buttonclicked")
    searchinput=$("#searchCity").val().trim();
    console.log(searchinput);
    CityWeather(searchinput);
  });

  function CityWeather (searchinput) {

   // var apiUrl =
    //dailyApiStarts + searchCityName + "&" + APIKey + "&" + unit;
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchinput + "&limit=1&appid=" + apiKey;


  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        console.log(data);
        var latitude = data[0].lat;
        var longitud = data[0].lon;
        cityName = data[0].name;
        var latstring = latitude.toString();
        var lonstring = longitud.toString();
        $("#cityName").html(data[0].name);
        // display date
        
       
        $("#todaydate").html(date);
        // display weather icon
       
          
        // return coordinate for getUVIndex to call
       // getUVIndex(lat, lon);
        getForecast(latstring, lonstring);
      });
    } else {
      alert("provide a valid city name please.");
    }
  });
  };



  function getForecast (lat, lon) {
    // formate the OpenWeather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then (function(data){
            console.log (data);
            var weatherIncoUrl =
            "http://openweathermap.org/img/wn/" +
          
          "@2x.png";
        $("#weatherIconToday").attr("src", weatherIncoUrl);
        $("#tempToday").html(data.main.temp + " \u00B0F");
        $("#humidityToday").html(data.main.humidity + " %");
        $("#windSpeedToday").html(data.wind.speed + " MPH");
          })
        }
       } )}