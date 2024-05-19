import Rain from "../images/rain-image.jpg";
import Snow from "../images/snow-image.jpg";
import Cloudy from "../images/cloud-image.jpg";
import Sunny from "../images/sun-image.jpg";

const weatherImages = { Rain, Snow, Cloudy, Sunny, };
const weatherGroups = {
  Rain: [[1240, 1246], [1150, 1201], [1072, 1087], [1063], [1030]],
  Snow: [[1249, 1282], [1204, 1237], [1114], [1066, 1069], [1117]],
  Cloudy: [
    [1003, 1009],
    [1135, 1147],
  ],
  Sunny: [[1000]],
};

export default function executeWeatherCode(number) {
  for (const group in weatherGroups) {
    // @ts-ignore
    for (const range of weatherGroups[group]) {
      if (range.length === 1 && number === range[0]) {
        return getWeatherImage(group);
      } else if (
        range.length === 2 &&
        number >= range[0] &&
        number <= range[1]
      ) {
        return getWeatherImage(group);
      }
    }
  }
  // Default to Sunny if no match is found
  return getWeatherImage("Sunny");
}

function getWeatherImage(group) {
  // @ts-ignore
  return weatherImages[group];
}
