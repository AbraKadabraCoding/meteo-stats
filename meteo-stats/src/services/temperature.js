export async function fetchMaxMinTemperature(location, startDate, endDate) {
  const params = {
    latitude: location.lat,
    longitude: location.lng,
    start_date: startDate,
    end_date: endDate,
    daily: ['temperature_2m_max', 'temperature_2m_min'],
  }

  const url = 'https://archive-api.open-meteo.com/v1/archive'

  // Fetch weather data
  const response = await fetch(url + '?' + new URLSearchParams(params))
  const data = await response.json()

  // Helper function to form time ranges
  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

  // Process the data
  const utcOffsetSeconds = data.utcOffsetSeconds
  const timezone = data.timezone
  const daily = data.daily

  const weatherData = {
    time: daily.time,
    tempMax: daily.temperature_2m_max,
    tempMin: daily.temperature_2m_min,
  }

  return weatherData
}
