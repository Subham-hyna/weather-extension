const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};

const API_KEY = "34f12c2b799b9944ea3ffbbafb56d215";
const loader = document.getElementById("loader");
const weather_block = document.getElementById("weather-block");

const getWeather = async (pos) => {
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    .then((data)=> data.json())
    .then((data) => (
    document.getElementById("city-name").innerHTML = data.name.toUpperCase(),
    document.getElementById("country-code").innerHTML = data.sys.country.toUpperCase(),

    document.getElementById("temp-text").innerHTML = Math.round(data.main.temp),
    document.getElementById("feelsliketemp-text").innerHTML = `Feels like ${Math.round(data.main.feels_like)}`,

    document.getElementById("temp_icon").setAttribute("src" , `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`),

    document.getElementById("temp_desc").innerHTML = data.weather[0].description.toUpperCase(),

    weather_block.style.display = "flex",
    loader.style.display = "none"
))
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(getWeather,error,options);