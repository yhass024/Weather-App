const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUi = (data) => {
  const cityDetails = data.cityDetails;
  const weather = data.weather;
  details.innerHTML = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
<div class="my-3">${weather.WeatherText}</div>
<div class="display-4 my-4">
  <span>${weather.Temperature.Metric.Value}</span>
  <span>&deg;C</span>
</div>`;
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);
  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityForm.city.value.trim();
  cityForm.reset();
  updateCity(city)
    .then((data) => {
      updateUi(data);
    })
    .catch((error) => {
      console.log(error);
    });
});
