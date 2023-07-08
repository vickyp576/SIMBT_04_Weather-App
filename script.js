let apiKey = "0cc46ad3f326d92a1d396e1e9f3fad17";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


let weatherIcon = document.querySelector(".weather-condition .weather-icon");
let inputField = document.getElementById("inputBox");
let searchBtn = document.getElementById("searchBtn");

let cities = [];

let dropdown = document.getElementById("autocompleteDropdown");

// Function to filter cities based on user input
function filterCities(inputValue) {
    let filteredCities = cities.filter(city => city.toLowerCase().startsWith(inputValue.toLowerCase()));
    return filteredCities;
  };

  // Function to display filtered cities in the dropdown
function showAutocomplete(filteredCities) {
    dropdown.innerHTML = '';
    filteredCities.forEach(city => {
      let li = document.createElement('li');
      li.textContent = city;
      dropdown.appendChild(li);

      // add a specific city name to input field by clicking on specific suggestion list
      li.addEventListener('click', ()=>{
        inputField.value = city;
        dropdown.style.display = "none";
      })

    });
  };

  inputField.addEventListener('input', () => {
    let inputValue = inputField.value;
    let filteredCities = filterCities(inputValue);
    showAutocomplete(filteredCities);

    if(inputValue !== ""){
        dropdown.style.display = "block";
      }else{
        dropdown.style.display = "none";
      }
  });



// fetching weather data starts from here
async function fetchWeather(city){
    let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".error").style.display = "block";
    }else{

        let data = await response.json();

        document.querySelector(".cityName").textContent = " Today's Weather in " + data.name;
        document.querySelector(".temperture").textContent = data.main.temp;
        document.querySelector(".weather-desc").textContent = (data.weather[0].description).charAt(0).toUpperCase() + (data.weather[0].description).slice(1);
        document.querySelector(".humidity").textContent = "Humidity: " + data.main.humidity + "%";
        document.querySelector(".wind").textContent = "Wind speed: " + data.wind.speed + " km/h";
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "./images/clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "./images/clear.png";
        }
        else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "./images/rain.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "./images/drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "./images/mist.png";
        }
        else if(data.weather[0].main == "Snow"){
            weatherIcon.src = "./images/snow.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
    inputField.value="";
}
searchBtn.addEventListener("click", ()=>{
    let inputValue = inputField.value;
    fetchWeather(inputValue);
   
});