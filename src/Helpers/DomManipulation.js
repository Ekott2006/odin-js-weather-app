export function createHourTempListItem(
    isCelsius,
    value
) {
    const result = [];
    for (let index = 0; index < value.length; index++) {
        const element = value[index];
        if (index % 4 !== 0) continue;
        result.push(
            createLiHelper([
                {name: "span", text: element.time.split(" ")[1]},
                {name: "img", src: element.icon},
                {
                    name: "span",
                    text: isCelsius ? element.temp.C + "°C" : element.temp.F + "°F",
                },
            ])
        );
    }
    return result;
}

export function createSearchResult(
    value, handleClick
) {
    const result = [];
    for (let index = 0; index < value.length; index++) {
        const element = value[index];
        const liElements = [
            {name: "bold", text: element.name},
            {name: "span", text: `,${element.region}, ${element.country}`},
        ];
        if (index !== value.length - 1) liElements.push({name: "hr"});
        const li = createLiHelper(liElements)
        li.onclick = () => handleClick(element.name);
        result.push(li);
    }
    return result;
}

export function createFunFacts( isCelsius, value) {
    const h3 = document.createElement("h3");
    h3.textContent = "Fun Facts";

    const ul = document.createElement("ul");
    ul.appendChild(createFunFactsHelper("Humidity: ", value.humidity + "%"));
    ul.appendChild(createFunFactsHelper("Sunrise: ", value.sunrise));
    ul.appendChild(createFunFactsHelper("Sunset: ", value.sunset));
    ul.appendChild(
        createFunFactsHelper(
            "Feels Like: ",
            isCelsius ? value.feelsLike.C + "°C" : value.feelsLike.F + "°F"
        )
    );
    ul.appendChild(
        createFunFactsHelper(
            "High: ",
            isCelsius ? value.maxTemp.C + "°C" : value.maxTemp.F + "°F"
        )
    );
    ul.appendChild(
        createFunFactsHelper(
            "Low: ",
            isCelsius ? value.minTemp.C + "°C" : value.minTemp.F + "°F"
        )
    );
    return [h3, ul];
}

export function createMainContentDOM(isCelsius, value) {
    return {
        location: `${value.location.name}, ${value.location.country}`,
        temperature: value.current.condition.text,
        funFactsResult: createFunFacts(isCelsius, {
            feelsLike: {C: value.current.feelslike_c, F: value.current.feelslike_f},
            maxTemp: {C: value.forecast.forecastday[0].day.maxtemp_c, F: value.forecast.forecastday[0].day.maxtemp_f},
            humidity: value.current.humidity,
            minTemp: {C: value.forecast.forecastday[0].day.mintemp_c, F: value.forecast.forecastday[0].day.mintemp_f},
            sunrise: value.forecast.forecastday[0].astro.sunrise,
            sunset: value.forecast.forecastday[0].astro.sunset
        }),
        hourTempResult: createHourTempListItem(isCelsius, value.forecast.forecastday[0].hour.map(x => ({
            icon: x.condition.icon,
            temp: {C: x.temp_c, F: x.temp_f},
            time: x.time,
        })))
    }
}


function createFunFactsHelper(boldText, pText) {
    return createLiHelper([
        {name: "b", text: boldText},
        {name: "span", text: pText},
    ]);
}

function createLiHelper(element) {
    const li = document.createElement("li");

    element.forEach((x) => {
        const elem = document.createElement(x.name);
        if (x.className) elem.className = x.className;
        if (x.text) elem.textContent = x.text;
        if (x.src) elem.src = x.src;
        li.appendChild(elem);
    });
    return li;
}

export function removeSearchResult() {
    document.querySelector("#search-result")?.replaceChildren();
}

export function removeFunFacts() {
    const div = document.querySelector("#fun-facts")
    div.replaceChildren();
    div.className = ""
}

export function removeHourTempList() {
    document.querySelector("#temp-result")?.replaceChildren();
}

export function removeAlert() {
    document.querySelector(".alert")?.replaceChildren();
}

export function removeHeading() {
    (document.querySelector("#location")).textContent = "";
    (document.querySelector('#temp')).textContent = ""
}

export function removeMain() {
    removeAlert()
    removeHeading()
    removeHourTempList()
    removeFunFacts()
}