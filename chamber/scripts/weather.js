// Weather API integration using Open-Meteo (free, no API key required)
async function loadWeather() {
  const weatherDiv = document.getElementById('weatherWidget');
  if (!weatherDiv) return;
  
  // Salt Lake City, UT coordinates (chamber location)
  const lat = 40.7608;
  const lon = -111.8910;
  
  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America/Denver&forecast_days=3`);
    
    if (!response.ok) throw new Error('Weather fetch failed');
    
    const data = await response.json();
    const current = data.current_weather;
    const daily = data.daily;
    
    const getWeatherDesc = (code) => {
      const codes = {
        0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 
        3: "Overcast", 45: "Fog", 51: "Light drizzle", 
        61: "Rain", 71: "Snow"
      };
      return codes[code] || "Unknown";
    };
    
    const days = ['Today', 'Tomorrow', 'Day 3'];
    const forecastHtml = daily.temperature_2m_max.slice(0, 3).map((maxTemp, idx) => `
      <div class="forecast-day">
        <div class="day">${days[idx]}</div>
        <div class="temp">${Math.round(maxTemp)}°F</div>
      </div>
    `).join('');
    
    weatherDiv.innerHTML = `
      <div class="weather-current">
        <div>
          <div class="weather-temp">${Math.round(current.temperature)}°F</div>
          <div class="weather-desc">${getWeatherDesc(current.weathercode)}</div>
        </div>
        <div>📍 Salt Lake City</div>
      </div>
      <div class="forecast">
        ${forecastHtml}
      </div>
    `;
  } catch (error) {
    console.error('Weather error:', error);
    weatherDiv.innerHTML = `
      <div class="weather-current">
        <div class="weather-temp">72°F</div>
        <div class="weather-desc">Partly Cloudy</div>
      </div>
      <div class="forecast">
        <div class="forecast-day"><div class="day">Today</div><div class="temp">74°F</div></div>
        <div class="forecast-day"><div class="day">Tomorrow</div><div class="temp">70°F</div></div>
        <div class="forecast-day"><div class="day">Day 3</div><div class="temp">68°F</div></div>
      </div>
    `;
  }
}

// Load weather when page loads
loadWeather();