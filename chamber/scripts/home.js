// home page: weather section and member spotlights

// weather for Salt Lake City using the open-meteo api (no key needed)
const weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.76&longitude=-111.89&current=temperature_2m,weather_code&daily=temperature_2m_max,weather_code&timezone=America%2FDenver&temperature_unit=fahrenheit&forecast_days=4";

const weatherNow = document.querySelector("#weather-now");
const forecastBox = document.querySelector("#forecast");

// meaning of the weather codes from the api docs
const weatherDescriptions = {
    0: "clear sky",
    1: "mainly clear",
    2: "partly cloudy",
    3: "overcast",
    45: "fog",
    48: "rime fog",
    51: "light drizzle",
    53: "drizzle",
    55: "dense drizzle",
    61: "slight rain",
    63: "rain",
    65: "heavy rain",
    71: "slight snow",
    73: "snow",
    75: "heavy snow",
    80: "rain showers",
    81: "rain showers",
    82: "violent rain showers",
    95: "thunderstorm",
    96: "thunderstorm with hail",
    99: "thunderstorm with hail"
};

function describe(code) {
    return weatherDescriptions[code] || "unknown";
}

async function getWeather() {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.log(error);
        weatherNow.innerHTML = "<p>Weather is not available right now.</p>";
    }
}

function displayWeather(data) {
    const temp = Math.round(data.current.temperature_2m);
    const desc = describe(data.current.weather_code);

    weatherNow.innerHTML = `
        <p class="temp">${temp}&deg;F</p>
        <p class="desc">${desc}</p>
    `;

    // next three days after today
    forecastBox.innerHTML = "";
    for (let i = 1; i <= 3; i++) {
        const date = new Date(data.daily.time[i]);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" });
        const max = Math.round(data.daily.temperature_2m_max[i]);

        forecastBox.innerHTML += `
            <div>
                <span class="day">${dayName}</span>
                <span>${max}&deg;F</span>
            </div>
        `;
    }
}

// company spotlights: 3 random gold or silver members
const spotlightsContainer = document.querySelector("#spotlights");

const levelNames = {
    2: "Silver",
    3: "Gold"
};

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        const qualified = data.members.filter(member => member.membership >= 2);

        // shuffle and grab the first three
        qualified.sort(() => Math.random() - 0.5);
        const picked = qualified.slice(0, 3);

        picked.forEach(member => {
            const card = document.createElement("section");
            card.classList.add("spotlight");
            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo" width="300" height="200" loading="lazy">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}">Visit Website</a>
                <p><span class="level-badge">${levelNames[member.membership]} Member</span></p>
            `;
            spotlightsContainer.appendChild(card);
        });
    } catch (error) {
        console.log(error);
        spotlightsContainer.innerHTML = "<p>Spotlights could not be loaded.</p>";
    }
}

getWeather();
getSpotlights();
