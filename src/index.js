import "./css/reset.css";
import "./css/styles.css";
import {
  createMainContentDOM,
  createSearchResult,
  removeMain,
  removeSearchResult,
} from "./Helpers/DomManipulation";
import { urlBuilder } from "./Helpers/FetchHelpers";
import executeWeatherCode from "./Helpers/ChangeBackgroundImage";

const body = document.querySelector("body")
const searchInput = document.querySelector("#search-input")
const searchResult = document.querySelector("#search-result");
const loader = document.querySelector("#loader")
const alert = document.querySelector("#alert")
const funFacts = document.querySelector("#fun-facts")
const tempResult = document.querySelector("#temp-result")
const toggleInput = document.querySelector("#toggle")

const getIsCelsius = () => toggleInput.checked;

let data = null;
body.style.backgroundImage = `linear-gradient(rgba(0 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${executeWeatherCode(
  1
)})`;

/** TODO: On div#search-input ON CHANGE(Press Enter)
 *
 * TODO: Store State for Toggle Button
 */
searchInput.onchange = async () => {
  removeSearchResult();
  await getDataToDOM(searchInput.value);
};

/** TODO: On div#search-input ON INPUT(When key is pressed)
 * Fill in the DOM (ul#search-result)
 * On Click on the li(based on ul#search-result)
 * Run ** div#search-input ON CHANGE **
 */
searchInput.oninput = async () => {
  removeSearchResult();
  const response = await (
    await fetch(urlBuilder("search", searchInput.value))
  ).json();
  const results = createSearchResult(
    response.map(
      (x) => ({
        name: x.name,
        region: x.region,
        country: x.country,
        id: x.id,
      })
    ),
    async (name) => {
      removeSearchResult();
      await getDataToDOM(name);
    }
  );
  results.forEach((x) => searchResult?.appendChild(x));
};

toggleInput.oninput = () => {
  if (!data) return;
  removeMain();

  const result = createMainContentDOM(getIsCelsius(), data);

  document.querySelector("#location").textContent =
    result.location;
  document.querySelector("#temp").textContent =
    result.temperature;
  result.hourTempResult.forEach((x) => tempResult.appendChild(x));
  result.funFactsResult.forEach((x) => funFacts.appendChild(x));
  funFacts.className = "card";
};

/** 
 * Then Make HTTP Request --> On loading(loading button), On Error(alert heading)
 * On data -> Fill in the div#content
 */
export async function getDataToDOM(input){
  removeMain();
  loader.style.display = "block";
  try {
    const response = await (await fetch(urlBuilder("forecast", input))).json();
    if (response.error) {
      alert.style.display = "block";
      alert.textContent = response.error.message;
      return;
    }

    alert.style.display = "none";
    body.style.backgroundImage = `linear-gradient(rgba(0 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(${executeWeatherCode(
      response.current.condition.code
    )})`;

    data = response;

    const result = createMainContentDOM(getIsCelsius(), response);

    document.querySelector("#location").textContent =
      result.location;
    document.querySelector("#temp").textContent =
      result.temperature;
    result.hourTempResult.forEach((x) => tempResult.appendChild(x));
    result.funFactsResult.forEach((x) => funFacts.appendChild(x));
    funFacts.className = "card";
  } catch (e) {
    // @ts-ignore
    alert.textContent = e.message;
    alert.style.display = "block";
  } finally {
    loader.style.display = "none";
  }
}
