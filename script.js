function getAPILink(key, city) {
	return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
}

// Fetches JSON from an API
async function fetchJSON(link) {
	try {
		const response = await fetch(link.toString(), { mode: "cors" });
		const json = await response.json();
		return json;
	} catch (error) {
		console.log(error);
	}
}

async function getCityWeather(city) {
	const apiKey = "0fadbac86e2d70e657c84fd23dfd57c4";
	const apiLink = getAPILink(apiKey, city);
	const json = await fetchJSON(apiLink);

	console.log(json.main);

	return json.main;
}

async function render() {
	const city = "Chicago";
	const weather = await getCityWeather(city);
}

window.onload = render();
