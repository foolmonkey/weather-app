let weatherCache = {
	celsius: {},
	fahrenheit: {},
};

function getAPILink(key, city) {
	return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
}

// Fetches JSON from an API
async function fetchJSON(link) {
	const response = await fetch(link.toString(), { mode: "cors" });
	const json = await response.json();

	return json.main;
}

async function getCityWeather(city) {
	const apiKey = "0fadbac86e2d70e657c84fd23dfd57c4";
	const apiLink = getAPILink(apiKey, city);
	return await fetchJSON(apiLink);
}

function addCityListener() {
	const inputField = document.getElementsByTagName("input")[0];
	inputField.addEventListener("change", (e) => {
		let city = e.target.value;
		city = city.trim();

		render(city);
	});
}

function showLoading() {
	const loading = document.getElementById("loading");
	loading.style.visibility = "visible";
}

function hideLoading() {
	const loading = document.getElementById("loading");
	loading.style.visibility = "hidden";
}

function renderWeatherInfo(info) {
	if (info == null) {
		// error boundary
	} else {
		for (const key in info) {
			document.getElementById(key).textContent = info[key];
		}
	}
}

function convertKelvinToCelsius(number) {
	return number - 273;
}

function convertCelsiusToFahrenheit(number) {
	return number * 1.8 + 32;
}

function convertFahrenheitToCelsius(number) {
	return ((number - 32) * 5) / 9;
}

function convertTemperature(number, units) {
	number = convertKelvinToCelsius(number);

	if (units == "fahrenheit") {
		number = convertCelsiusToFahrenheit(number);
	}

	return number;
}

function convertWeatherInfo(info, units) {
	return {
		feels_like: convertTemperature(info.feels_like, units).toFixed(0),
		humidity: info.humidity,
		pressure: info.pressure,
		temp: convertTemperature(info.temp, units).toFixed(0),
		temp_max: convertTemperature(info.temp_max, units).toFixed(1),
		temp_min: convertTemperature(info.temp_min, units).toFixed(1),
	};
}

function appendWeatherInfo(info) {
	if (info == null) {
		// error boundary
	} else {
		weatherCache.celsius = convertWeatherInfo(info, "celsius");
		weatherCache.fahrenheit = convertWeatherInfo(info, "fahrenheit");
	}
}

function addConversionListener() {
	document.getElementById("convert").addEventListener("change", (e) => {
		if (document.getElementById("temp").textContent.length > 0) {
			if (e.target.value == "celsius") {
				renderWeatherInfo(weatherCache.celsius);
			} else if (e.target.value == "fahrenheit") {
				renderWeatherInfo(weatherCache.fahrenheit);
			}
		}
	});
}

async function render(city) {
	showLoading();
	const weather = await getCityWeather(city);

	hideLoading();

	appendWeatherInfo(weather);
	renderWeatherInfo(weatherCache.celsius);
}

window.onload = () => {
	addCityListener();
	addConversionListener();

	render("Chicago");
};
